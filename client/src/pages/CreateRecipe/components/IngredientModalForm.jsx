import { useState } from 'react';

import { validateIngredient } from '../../../utils/validations';
import TextField from '../../../components/CustomInputs/TextField';

const initialIngredientData = {
   name: '',
   image: '',
   recipe_ingredient: {
      amount: '',
      unit: '',
   }
};

const IngredientModalForm = ({ closeModal, addIngredient }) => {
   const [ingredientData, setIngredientData] = useState(initialIngredientData);
   const [errors, setErrors] = useState({});

   const handleChange = (e) => {
      const { name, value } = e.target;

      if (name === 'amount' || name === 'unit') {
         setIngredientData((prev) => ({
            ...prev,
            recipe_ingredient: {
               ...prev.recipe_ingredient,
               [name]: value,
            },
         }));
      } else {
         setIngredientData((prev) => ({ ...prev, [name]: value }));
      }

      const errors = validateIngredient({ [name]: value });

      setErrors((prev) => ({ ...prev, [name]: errors[name] }));
   };

   const handleAddButton = () => {
      const errors = validateIngredient(ingredientData);

      if (Object.keys(errors).length > 0) {
         setErrors(errors);
         return;
      }

      addIngredient(ingredientData);
      setIngredientData(initialIngredientData);
   };

   const handleCancelButton = () => {
      setErrors({});
      setIngredientData(initialIngredientData);
      closeModal();
   };

   return (
      <div className='add-ingredient-modal'>
         <div className='input-box'>
            <TextField
               errorMessage={errors.name}
               name='name'
               value={ingredientData.name}
               autoFocus
               type='text'
               error={!!errors.name}
               handleChange={handleChange}
               placeholder='Ingredient name'
               label='Name'
            />
         </div>

         <div className='input-box'>
            <TextField
               errorMessage={errors.image}
               name='image'
               value={ingredientData.image}
               type='text'
               error={!!errors.image}
               handleChange={handleChange}
               placeholder='Image URL'
               label='Image'
            />
         </div>

         <div className='input-box'>
            <TextField
               errorMessage={errors.amount}
               name='amount'
               value={ingredientData.recipe_ingredient.amount}
               type='number'
               error={!!errors.amount}
               handleChange={handleChange}
               placeholder='Amount: 1, 2, 3, etc'
               label='Amount'
            />
         </div>

         <div className='input-box'>
            <TextField
               errorMessage={errors.unit}
               name='unit'
               value={ingredientData.recipe_ingredient.unit}
               type='text'
               error={!!errors.unit}
               handleChange={handleChange}
               placeholder='Unit: g, kg, ml, tablespoon, etc.'
               label='Unit'
            />
         </div>

         <div className='modal-btn-group'>
            <button
               type='button'
               className='button button-cancel'
               onClick={handleCancelButton}
            >
               Cancel
            </button>
            <button
               type='button'
               className='button button-add'
               onClick={handleAddButton}
            >
               Add
            </button>
         </div>
      </div>
   );
};

export default IngredientModalForm;
