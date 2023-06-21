import recipeService from '../services/recipeService.js';
import { HTTP_STATUS } from '../utils/constants.js';
import {
   validateRecipe,
   validateAnalyzedInstructions,
   validateExtendedIngredients,
} from '../utils/helpers.js';

const getAllRecipes = async (req, res, next) => {
   const { name, offset = 0, limit = 10 } = req.query;

   try {
      const results = [];
      const apiData = await recipeService.getAllRecipes(name, offset, limit);
      const dbData = await recipeService.getAllRecipesFromDB(name, offset, limit);

      results.push(...apiData.results.map((recipe) => {
         return {
            diets: recipe.diets,
            healthScore: recipe.healthScore,
            id: recipe.id,
            image: recipe.image,
            nutrients: [recipe.nutrition?.nutrients.at(0)],
            readyInMinutes: recipe.readyInMinutes,
            title: recipe.title,
         };
      }));

      results.push(...dbData);

      res.status(HTTP_STATUS.OK).json({
         results,
      });
   } catch (error) {
      next(error);
   }
};

const getRecipeById = async (req, res, next) => {
   const { recipeId } = req.params;
   try {
      const data = await recipeService.getRecipeById(recipeId);

      res.status(HTTP_STATUS.OK).json(data);
   } catch (error) {
      next(error);
   }
};

const createNewRecipe = async (req, res, next) => {
   const {
      name,
      readyInMinutes,
      healthScore,
      image,
      summary,
      servings,
      dietsId = [],
      extendedIngredients = [],
      analyzedInstructions = [],
   } = req.body;

   try {
      validateRecipe({
         name,
         readyInMinutes,
         healthScore,
         image,
         summary,
         servings,
      });
      validateExtendedIngredients(extendedIngredients);
      validateAnalyzedInstructions(analyzedInstructions);

      const newRecipe = await recipeService.createNewRecipe(
         {
            name,
            readyInMinutes,
            healthScore,
            image,
            summary,
            servings,
         },
         dietsId,
         extendedIngredients,
         analyzedInstructions
      );

      res.status(HTTP_STATUS.CREATED).json(newRecipe);
   } catch (error) {
      next(error);
   }
};

const updateRecipe = (req, res) => {
   res.send('Update recipe');
};

const deleteRecipeById = (req, res) => {
   res.send('Delete recipe by id');
};

export default {
   getAllRecipes,
   getRecipeById,
   updateRecipe,
   deleteRecipeById,
   createNewRecipe,
};
