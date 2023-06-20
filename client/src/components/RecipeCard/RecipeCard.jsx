import { useNavigate } from 'react-router-dom';

import { ReactComponent as Chronometer } from '../../assets/chronometer.svg';
import { ReactComponent as Flame } from '../../assets/flame-2.svg';
import './recipeCard.less';

const RecipeCard = ({ recipe }) => {
   const navigation = useNavigate();

   const handleCardClick = () => {
      navigation(`/detail/${recipe.id}`);
   };

   return (
      <div className='recipe-card' onClick={handleCardClick}>
         <figure>
            <img src={recipe.image} alt={recipe.title ?? recipe.name} loading='lazy' />
         </figure>

         <div className='recipe-card-content'>
            <h2 className='recipe-card-title'>{recipe.title ?? recipe.name}</h2>

            <div className='recipe-card-info'>
               <p>
                  <Chronometer /> {recipe.readyInMinutes}min
               </p>
               <p title='Calories'>
                  <Flame />
                  {recipe.nutrients?.at(0).amount ?? '--'} cal
               </p>
               <p
                  title='Health Score'
                  style={{
                     color: recipe.healthScore > 50 ? '#32a932' : '#FF0000',
                     fontWeight: '500',
                  }}
               >
                  {recipe.healthScore}%
               </p>
            </div>

            <div className='recipe-card-diets'>
               {recipe.diets?.length === 0 ? (
                  <span>omnivore</span>
               ) : (
                  recipe.diets?.map((diet, index) => (
                     <span key={index}>{diet}</span>
                  ))
               )}
            </div>
         </div>
      </div>
   );
};

export default RecipeCard;
