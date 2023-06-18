export const validateIngredient = (ingredient) => {
   const auxIngredient = {
      name: ingredient.name,
      image: ingredient.image,
      amount: ingredient.recipe_ingredient.amount,
      unit: ingredient.recipe_ingredient.unit,
   };
   let errors = {};

   Object.keys(auxIngredient).some((key) => {
      const value = auxIngredient[key];
      if (value.trim() === '') {
         errors[key] = `${key} is required`;
      }
   });

   if (auxIngredient.amount < 0) {
      errors.amount = 'Amount must be greater than 0';
   }

   return errors;
};
