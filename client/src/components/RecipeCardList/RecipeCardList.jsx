import recipes from '../../utils/recipesData.json';
import RecipeCard from '../RecipeCard/RecipeCard';
import './recipeCardList.less';

const RecipeCardList = () => {
   return (
      <div className='recipe-card-list'>
         {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
         ))}
      </div>
   );
};

export default RecipeCardList;
