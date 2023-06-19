import {
   MultiSelectAccordion,
   TextField,
   TextareaField,
} from '../../../components';
import { useDiets } from '../../../hooks/useDiets';
import { validateRecipe } from '../../../utils/validations';
import { ACTION_TYPES } from '../recipeFormActionTypes';

const RecipeForm = ({ recipe, dispatch, errors, addError }) => {
   const { diets } = useDiets();

   const addToSelectedDiets = (e) => {
      const dietId = +e.target.dataset.id;
      if (recipe.dietsId.includes(dietId)) {
         dispatch({ type: ACTION_TYPES.REMOVE_DIET, payload: dietId });
      } else {
         dispatch({ type: ACTION_TYPES.SET_DIET, payload: dietId });
      }
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      dispatch({
         type: ACTION_TYPES.INPUT_CHANGE,
         payload: {
            name: name,
            value: value,
         },
      });

      const error = validateRecipe({ [name]: value });

      addError({ name, error: error[name] });
   };

   return (
      <div className='create-recipe-recipe-information'>
         <div className='input-box'>
            <TextField
               name='name'
               placeholder='Recipe Name'
               value={recipe.name}
               autoFocus={true}
               handleChange={handleChange}
               label='Recipe Name'
               errorMessage={errors.name}
               error={!!errors.name}
            />
         </div>

         <div className='input-box'>
            <TextareaField
               name='summary'
               placeholder='Recipe Summary'
               value={recipe.summary}
               handleChange={handleChange}
               label='Summary'
               errorMessage={errors.summary}
               error={!!errors.summary}
            />
         </div>

         <div className='input-box'>
            <TextField
               name='image'
               placeholder='Image URL'
               value={recipe.image}
               handleChange={handleChange}
               label='Image'
               errorMessage={errors.image}
               error={!!errors.image}
            />
         </div>

         <div className='input-box'>
            <TextField
               name='readyInMinutes'
               placeholder='Ready in minutes'
               value={recipe.readyInMinutes}
               type='number'
               handleChange={handleChange}
               label='Ready in minutes'
               errorMessage={errors.readyInMinutes}
               error={!!errors.readyInMinutes}
            />
         </div>

         <div className='input-box'>
            <TextField
               name='healthScore'
               placeholder='Health score'
               value={recipe.healthScore}
               type='number'
               handleChange={handleChange}
               label='Health score'
               errorMessage={errors.healthScore}
               error={!!errors.healthScore}
            />
         </div>

         <div className='input-box'>
            <TextField
               name='servings'
               placeholder='Servings: 1, 2 ...'
               value={recipe.servings}
               type='number'
               handleChange={handleChange}
               label='Servings'
               errorMessage={errors.servings}
               error={!!errors.servings}
            />
         </div>

         <MultiSelectAccordion
            options={diets}
            addToSelectedFilters={addToSelectedDiets}
            title='Diets'
            styles={{
               borderBottom: '1px solid #32b868',
            }}
         />
      </div>
   );
};

export default RecipeForm;
