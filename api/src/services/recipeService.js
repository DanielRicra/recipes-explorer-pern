import { NotFoundError } from '../errors/customErrors.js';
import db from '../db.js';
import { formattedRecipeData, isValidUUIDV4 } from '../utils/helpers.js';
import { QueryTypes } from 'sequelize';

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';
const SEARCH_URL = `${BASE_URL}/complexSearch?apiKey=${API_KEY}`;

const getAllRecipes = async (name = '', offset = 0, limit = 10) => {
   try {
      const response = await fetch(
         `${SEARCH_URL}&query=${name}&addRecipeNutrition=true&number=${limit}&offset=${offset}`,
         { method: 'GET' }
      );

      const data = await response.json();
      return data;
   } catch (error) {
      throw error;
   }
};

const getAllRecipesFromDB = async (name = '', offset = 0, limit = 10) => {
   try {
      const dataFromDb = await db.sequelize.query(
         `SELECT r.*, ARRAY_AGG(d.name) AS diets
            FROM recipes r
            INNER JOIN recipe_diet rd ON rd."recipeId" = r.id
            INNER JOIN diets d ON rd."dietId" = d.id
            WHERE r.name ILIKE '%${name}%'
            GROUP BY r.id LIMIT ${limit} OFFSET ${offset}`,
         {
            type: QueryTypes.SELECT,
         }
      );

      return dataFromDb;
   } catch (error) {
      throw error;
   }
};

const getRecipeById = async (recipeId) => {
   try {
      if (isValidUUIDV4(recipeId)) {
         const recipeDB = await db.Recipe.findOne({
            where: {
               id: recipeId,
            },
            include: [
               db.Ingredient,
               { model: db.AnalyzedInstruction, include: [db.Step] },
               {
                  model: db.Diet,
                  attributes: ['name'],
                  through: { attributes: [] },
               },
            ],
         });

         if (!recipeDB) {
            throw new NotFoundError('Recipe not found');
         }

         return formattedRecipeData(recipeDB);
      }

      const response = await fetch(
         `${BASE_URL}/${recipeId}/information?apiKey=${API_KEY}`,
         { method: 'GET' }
      );

      if (response.status === 404) {
         throw new NotFoundError('Recipe not found');
      }

      const data = await response.json();

      return data;
   } catch (error) {
      throw error;
   }
};

/**
 * @param {Object} recipe
 * @param {string[]} dietsId
 * @returns {Object} the created recipe
 */
const createNewRecipe = async (
   recipe,
   dietsId,
   extendedIngredients,
   analyzedInstructions
) => {
   let transaction = await db.sequelize.transaction();

   try {
      const newRecipe = await db.Recipe.create(
         {
            ...recipe,
            analyzed_instructions: analyzedInstructions,
            ingredients: extendedIngredients,
         },
         {
            transaction,
            include: [
               {
                  association: db.Recipe.AnalyzedInstruction,
                  include: [db.AnalyzedInstruction.Step],
               },
               db.Ingredient,
            ],
         }
      );

      const foundDiets = await db.Diet.findAll(
         {
            where: {
               id: dietsId,
            },
         },
         { transaction }
      );

      if (foundDiets.length > 0) {
         await newRecipe.addDiets(foundDiets, { transaction });
      }

      await transaction.commit();

      return {
         ...newRecipe.dataValues,
         diets: foundDiets.map((diet) => diet.name),
      };
   } catch (error) {
      transaction.rollback();
      throw error;
   }
};

export default {
   getRecipeById,
   getAllRecipes,
   createNewRecipe,
   getAllRecipesFromDB,
};
