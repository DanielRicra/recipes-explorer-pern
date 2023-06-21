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
      { name: 'whole 30' },
      { name: 'vegan' },
      { name: 'primal' },
      { name: 'fodmap friendly' },
      { name: 'dairy free' },
      { name: 'paleolithic' },
      { name: 'lacto ovo vegetarian' },
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

   extendedIngredients.forEach(({ name, image, recipe_ingredient }) => {
      if (!name || !image || !recipe_ingredient) {
         throw new BadRequestError('Ingredients have missing fields');
      }

      if (!recipe_ingredient.amount || !recipe_ingredient.unit) {
         throw new BadRequestError(
            'Some recipe_ingredients have missing fields'
         );
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

   analyzedInstructions.forEach(({ steps }) => {
      if (!steps) {
         throw new BadRequestError('Some Instruction has missing fields');
      }

      steps.forEach(({ step, number }) => {
         if (!step || !number) {
            throw new BadRequestError('Some steps have missing fields');
         }
      });
   });
};

export const isValidUUIDV4 = (uuid) => {
   return /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.test(
      uuid
   );
};

export const formattedRecipeData = (recipe) => {
   const extendedIngredients = recipe.ingredients.map((ingredient) => {
      return {
         id: ingredient.id,
         image: ingredient.image,
         name: ingredient.name,
         amount: ingredient.recipe_ingredient.amount,
         unit: ingredient.recipe_ingredient.unit,
      };
   });

   const analyzedInstructions = recipe.analyzed_instructions.map(
      (instruction) => {
         return {
            id: instruction.id,
            name: instruction.name,
            steps: instruction.steps.map((step) => {
               return {
                  id: step.id,
                  number: step.number,
                  step: step.step,
               };
            }),
         };
      }
   );

   return {
      preparationMinutes: recipe.preparationMinutes ?? -1,
      cookingMinutes: recipe.cookingMinutes ?? -1,
      healthScore: recipe.healthScore,
      extendedIngredients,
      id: recipe.id,
      name: recipe.name,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      image: recipe.image,
      summary: recipe.summary,
      diets: recipe.diets.map((diet) => diet.name),
      analyzedInstructions,
   };
};
