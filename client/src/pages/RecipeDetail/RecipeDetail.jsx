import { useParams } from 'react-router-dom';
import { useEffect, useReducer } from 'react';

import { ReactComponent as IconTimer } from '../../assets/chronometer.svg';
import recipeService from '../../services/recipeService';
import './recipeDetail.less';
import { INITIAL_STATE, recipeReducer } from './recipeReducer';
import { actionTypes } from '../../utils/constants';
import { AxiosError } from 'axios';

const TimeCard = ({ title, time, timeUnit }) => {
   return (
      <div className='time-card'>
         <p className='time-card-title'>{title}</p>
         <div className='time-card-content'>
            <IconTimer />
            <div className='time-card-content-time'>
               {time}
               <span>{timeUnit}</span>
            </div>
         </div>
      </div>
   );
};

const RecipeDetail = () => {
   const { id } = useParams();
   const [state, dispatch] = useReducer(recipeReducer, INITIAL_STATE);

   useEffect(() => {
      const getRecipeById = async () => {
         dispatch({ type: actionTypes.FETCH_START });
         try {
            const data = await recipeService.getRecipeById(id);
            dispatch({ type: actionTypes.FETCH_SUCCESS, payload: data });
         } catch (error) {
            if (error instanceof AxiosError) {
               dispatch({
                  type: actionTypes.FETCH_ERROR,
                  payload: error.response?.data.error ?? error.message,
               });
               return;
            }

            dispatch({ type: actionTypes.FETCH_ERROR, payload: error.message });
         }
      };

      getRecipeById();
   }, [id]);

   if (state.loading) {
      return (
         <div className='recipe-detail'>
            <h2
               style={{
                  textAlign: 'center',
                  fontSize: '26px',
                  marginTop: '2rem',
                  fontWeight: '500',
                  color: '#232332',
               }}
               className='animate-pulse'
            >
               Loading...
            </h2>
         </div>
      );
   }

   if (state.error) {
      return (
         <div className='recipe-detail'>
            <h2
               style={{
                  textAlign: 'center',
                  fontSize: '26px',
                  marginTop: '2rem',
                  fontWeight: '500',
                  color: '#d32332',
               }}
            >
               {state.error}
            </h2>
         </div>
      );
   }

   return (
      <div className='recipe-detail'>
         <section className='recipe-detail-header'>
            <div className='recipe-detail-header-info'>
               <h1 className='recipe-detail-title'>{state.recipe.title}</h1>
               <p className='recipe-detail-summary'>
                  {state.recipe.summary?.replace(/<[^>]+>/g, '')}
               </p>
               <div className='recipe-detail-diets'>
                  {state.recipe.diets?.map((diet, index) => (
                     <span key={index}>{diet}</span>
                  ))}
               </div>

               <div className='recipe-detail-timers'>
                  <TimeCard
                     title='Prep time'
                     time={state.recipe.preparationMinutes}
                     timeUnit='min'
                  />
                  <TimeCard
                     title='Cook time'
                     time={state.recipe.cookingMinutes}
                     timeUnit='min'
                  />
                  <TimeCard
                     title='Ready Time'
                     time={state.recipe.readyInMinutes}
                     timeUnit='min'
                  />
               </div>
            </div>

            <div className='recipe-detail-image'>
               <img
                  src={`https://spoonacular.com/recipeImages/${state.recipe.id}-636x393.jpg`}
                  alt={state.recipe.title}
                  width={636}
                  height={393}
               />
            </div>
         </section>

         <section className='recipe-detail-ingredients'>
            <h2>Ingredients</h2>
            <p>For {state.recipe.servings} people</p>
            <ul>
               {state.recipe.extendedIngredients?.map((ingredient, index) => (
                  <li key={index}>
                     <div className='ingredient-image'>
                        <img
                           src={`http://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                           alt={ingredient.name}
                           width={100}
                           height={100}
                           loading='lazy'
                        />
                     </div>
                     <p>{ingredient.name}</p>
                     <span>{`${ingredient.amount} ${ingredient.unit}`}</span>
                  </li>
               ))}
            </ul>
         </section>

         <section className='recipe-detail-instructions'>
            <h2>Instructions</h2>
            {state.recipe.analyzedInstructions?.map((instruction, index) => (
               <div key={index} className='instruction-card'>
                  <h3>
                     {instruction.name.trim() === ''
                        ? 'Main'
                        : instruction.name}
                  </h3>
                  <p>Steps {instruction.steps.length}</p>
                  <div className='instruction-card-steps'>
                     {instruction.steps?.map((step) => (
                        <div key={step.number} className='step-card'>
                           <span className='step-number'>{step.number}</span>
                           <span className='step-content'>{step.step}</span>
                        </div>
                     ))}
                  </div>
               </div>
            ))}
         </section>
      </div>
   );
};

export default RecipeDetail;
