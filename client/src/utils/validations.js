function getEmptyFieldErrors(object) {
   let errors = {};
   Object.keys(object).some((key) => {
      const value = object[key];
      if (value.trim() === '') {
         errors[key] = `${key} is required`;
      }
   });
   return errors;
}

export const validateIngredient = (ingredient) => {
   const auxIngredient = Object.keys(ingredient).length === 1 ? ingredient : {
      name: ingredient.name,
      image: ingredient.image,
      amount: ingredient.recipe_ingredient?.amount,
      unit: ingredient.recipe_ingredient?.unit,
   };

   let errors = getEmptyFieldErrors(auxIngredient);

   if (auxIngredient.amount < 0) {
      errors.amount = 'Amount must be greater than 0';
   }

   return errors;
};

export const validateRecipe = (recipe) => {
   const auxRecipe = Object.keys(recipe).length === 1 ? recipe : {
      name: recipe.name,
      image: recipe.image,
      summary: recipe.summary,
      readyInMinutes: recipe.readyInMinutes,
      healthScore: recipe.healthScore,
      servings: recipe.servings,
   };

   let errors = getEmptyFieldErrors(auxRecipe);

   if (auxRecipe.readyInMinutes < 0) {
      errors.readyInMinutes = 'Ready in minutes must be greater than 0';
   }

   if (auxRecipe.healthScore < 0 || auxRecipe.healthScore > 100) {
      errors.healthScore = 'Health score must be between 0 and 100';
   }

   if (auxRecipe.servings < 0) {
      errors.servings = 'Servings must be greater than 0';
   }

   if (recipe.extendedIngredients?.length === 0) {
      errors.extendedIngredients = 'At least one ingredient is required';
   }

   if (recipe.instructions?.steps.length === 0) {
      errors.instructions = 'At least one step is required';
   }

   return errors;
};
