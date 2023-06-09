import { BadRequestError } from '../errors/customErrors.js';

export function createDiets(Diet) {
   Diet.bulkCreate([
      { name: 'lacto vegetarian' },
      { name: 'ovo vegetarian' },
      { name: 'gluten free' },
      { name: 'pescetarian' },
      { name: 'low fodmap' },
      { name: 'paleo' },
      { name: 'ketogenic' },
      { name: 'vegetarian' },
      { name: 'omnivore' },
      { name: 'whole 30' },
      { name: 'vegan' },
      { name: 'primal' },
   ])
      .then(() => {
         console.log('Created diets. OK');
      })
      .catch((err) => {
         console.log('Failed to create diets: ' + err.message);
      });
}

/**
 * @param {Object} recipe
 * @throws {BadRequestError} When the recipe is not valid.
 */
export const validateRecipe = (recipe) => {
   if (
      !recipe.name ||
      !recipe.readyInMinutes ||
      !recipe.summary ||
      !recipe.healthScore ||
      !recipe.image ||
      !recipe.servings
   ) {
      throw new BadRequestError('Missing recipe fields');
   }
};

/**
 * @param {Object[]} extendedIngredients
 * @throws {BadRequestError} When the extendedIngredients are not valid.
 */
export const validateExtendedIngredients = (extendedIngredients) => {
   if (!extendedIngredients.length) {
      throw new BadRequestError('No ingredients provided');
   }

   extendedIngredients.forEach(({ name, image, consistency, recipe_ingredient }) => {
      if (!name || !image || !consistency || !recipe_ingredient) {
         throw new BadRequestError('Ingredients have missing fields');
      }

      if (!recipe_ingredient.amount || !recipe_ingredient.unit) {
         throw new BadRequestError('Some recipe_ingredients have missing fields');
      }
   });
};

/**
 * @param {Object[]} analyzedInstructions
 * @throws {BadRequestError} When the analyzedInstructions are not valid.
 */
export const validateAnalyzedInstructions = (analyzedInstructions) => {
   if (!analyzedInstructions.length) {
      throw new BadRequestError('No instructions  provided');
   }

   analyzedInstructions.forEach(({ name, steps }) => {
      if (!name || !steps) {
         throw new BadRequestError('Some Instruction has missing fields');
      }

      steps.forEach(({ step, number }) => {
         if (!step || !number) {
            throw new BadRequestError('Some steps have missing fields');
         }
      });
   });
};
