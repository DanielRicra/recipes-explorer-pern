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
            <img src={recipe.image} alt={recipe.title} loading='lazy' />
         </figure>

         <div className='recipe-card-content'>
            <h2 className='recipe-card-title'>{recipe.title}</h2>

            <div className='recipe-card-info'>
               <p><Chronometer />  {recipe.readyInMinutes}min</p>
               <p>
                  <Flame />
                  {Math.round(recipe.nutrients[0].amount)} Calories
               </p>
            </div>

            <div className='recipe-card-diets'>
               {recipe.diets?.length === 0 ? (
                  <span>omnivore</span>
               ) : recipe.diets?.map((diet, index) => (
                  <span key={index}>{diet}</span>
               ))}
            </div>
         </div>
      </div>
   );
};

export default RecipeCard;
