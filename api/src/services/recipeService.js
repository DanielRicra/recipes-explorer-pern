import { NotFoundError } from '../errors/customErrors.js';
import db from '../db.js';

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
      throw new Error(error.message);
   }
};

const getRecipeById = async (recipeId) => {
   try {
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
};
