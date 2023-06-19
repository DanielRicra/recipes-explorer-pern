import { useReducer, useState } from 'react';

import IngredientList from './components/IngredientList';
import Instructions from './components/Instructions';
import RecipeForm from './components/RecipeForm';
import { INITIAL_STATE, recipeFormReducer } from './recipeFormReducer';
import './createRecipe.less';
import { validateRecipe } from '../../utils/validations';

const CreateRecipe = () => {
   const [state, dispatch] = useReducer(recipeFormReducer, INITIAL_STATE);
   const [errors, setErrors] = useState({});

   const addError = ({ name, error }) => {
      setErrors((prev) => ({ ...prev, [name]: error }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      const errors = validateRecipe(state);
      setErrors(errors);

      if (Object.keys(errors).length > 0) {
         return;
      }

      //TODO: send a post request to the server
   };

   return (
      <div className='create-recipe'>
         <h2>Let&apos;s Create a brand new Recipe</h2>

         <form className='create-recipe-form' onSubmit={handleSubmit}>
            <div className='recipe-ingredients'>
               <RecipeForm
                  recipe={state}
                  dispatch={dispatch}
                  errors={errors}
                  addError={addError}
               />

               <div className='flex-column'>
                  <IngredientList
                     extendedIngredients={state.extendedIngredients}
                     dispatch={dispatch}
                  />
                  <p className='error-message'>
                     {errors.extendedIngredients ?? ''}
                  </p>
               </div>
            </div>

            <div className='flex-column'>
               <Instructions
                  instructions={state.instructions}
                  dispatch={dispatch}
               />
               <p className='error-message'>{errors.instructions ?? ''}</p>
            </div>

            <div className='create-recipe-btn-container'>
               <div className='error-messages'>
                  {Object.keys(errors).length > 0 && (
                     <p
                        className='error-message'
                        style={{ marginBottom: '4px' }}
                     >
                        Please fix the errors above
                     </p>
                  )}
               </div>

               <button type='submit' className='button'>
                  Create Recipe
               </button>
            </div>
         </form>
      </div>
   );
};

export default CreateRecipe;
