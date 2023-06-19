import { useReducer, useState } from 'react';

import IngredientList from './components/IngredientList';
import Instructions from './components/Instructions';
import RecipeForm from './components/RecipeForm';
import { INITIAL_STATE, recipeFormReducer } from './recipeFormReducer';
import './createRecipe.less';
import { validateRecipe } from '../../utils/validations';
import recipeService from '../../services/recipeService';
import {
   createRecipeReducer,
   INITIAL_STATE as INITIAL_STATE_CREATE,
} from './recipeReducer';
import { actionTypes } from '../../utils/constants';
import { ACTION_TYPES } from './recipeFormActionTypes';
import { AxiosError } from 'axios';

const CreateRecipe = () => {
   const [state, dispatch] = useReducer(recipeFormReducer, INITIAL_STATE);
   const [errors, setErrors] = useState({});
   const [stateCreate, dispatchCreate] = useReducer(
      createRecipeReducer,
      INITIAL_STATE_CREATE
   );

   const addError = ({ name, error }) => {
      setErrors((prev) => ({ ...prev, [name]: error }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const errors = validateRecipe(state);
      setErrors(errors);

      if (Object.keys(errors).length > 0) {
         return;
      }

      try {
         dispatchCreate({ type: actionTypes.FETCH_START });
         const recipeDTO = {
            ...state,
            analyzedInstructions: [state.instructions],
         };
         delete recipeDTO.instructions;

         const data = await recipeService.createNewRecipe(recipeDTO);
         dispatchCreate({ type: actionTypes.FETCH_SUCCESS, payload: data });
         dispatch({ type: ACTION_TYPES.RESET_FORM });
      } catch (error) {
         if (error instanceof AxiosError) {
            dispatchCreate({
               type: actionTypes.FETCH_ERROR,
               payload: error.response.data.error,
            });
            return;
         }

         dispatchCreate({
            type: actionTypes.FETCH_ERROR,
            payload: 'Something went wrong',
         });
      }
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
                  {stateCreate.loading ? 'Creating...' : 'Create Recipe'}
               </button>
               {stateCreate.error && (
                  <p className='error-message'>{stateCreate.error}</p>
               )}
            </div>
         </form>
      </div>
   );
};

export default CreateRecipe;
