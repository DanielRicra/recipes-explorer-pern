import { ReactComponent as IconTimer } from '../../assets/chronometer.svg';
import recipe from './recipe.json';
import './recipeDetail.less';

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
   return (
      <div className='recipe-detail'>
         <section className='recipe-detail-header'>
            <div className='recipe-detail-header-info'>
               <h1 className='recipe-detail-title'>{recipe.title}</h1>
               <p className='recipe-detail-summary'>
                  {recipe.summary.replace(/<[^>]+>/g, '')}
               </p>
               <div className='recipe-detail-diets'>
                  {recipe.diets.map((diet, index) => (
                     <span key={index}>{diet}</span>
                  ))}
               </div>

               <div className='recipe-detail-timers'>
                  <TimeCard
                     title='Prep time'
                     time={recipe.preparationMinutes}
                     timeUnit='min'
                  />
                  <TimeCard
                     title='Cook time'
                     time={recipe.cookingMinutes}
                     timeUnit='min'
                  />
                  <TimeCard
                     title='Ready Time'
                     time={recipe.readyInMinutes}
                     timeUnit='min'
                  />
               </div>
            </div>

            <div className='recipe-detail-image'>
               <img
                  src={`https://spoonacular.com/recipeImages/${recipe.id}-636x393.${recipe.imageType}`}
                  alt={recipe.title}
                  width={636}
                  height={393}
               />
            </div>
         </section>

         <section className='recipe-detail-ingredients'>
            <h2>Ingredients</h2>
            <p>For {recipe.servings} people</p>
            <ul>
               {recipe.extendedIngredients.map((ingredient, index) => (
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
            {recipe.analyzedInstructions.map((instruction, index) => (
               <div key={index} className='instruction-card'>
                  <h3>
                     {instruction.name.trim() === ''
                        ? 'Main'
                        : instruction.name}
                  </h3>
                  <p>Steps {instruction.steps.length}</p>
                  <div className='instruction-card-steps'>
                     {instruction.steps.map((step) => (
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
