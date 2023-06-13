import recipes from '../../utils/data.json';
import RecipeCard from '../RecipeCard/RecipeCard';
import './recipeCardList.less';

const RecipeCardList = () => {
   return (
      <div className='recipe-card-list'>
         {recipes.results.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
         ))}
      </div>
   );
};

export default RecipeCardList;
