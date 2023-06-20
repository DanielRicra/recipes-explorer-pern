import RecipeCard from '../RecipeCard/RecipeCard';
import './recipeCardList.less';

const RecipeCardList = ({ recipes }) => {
   return (
      <div className='recipe-card-list'>
         {recipes.length === 0 && (
            <p
               style={{
                  textAlign: 'center',
                  marginTop: '20px',
                  fontSize: '30px',
                  color: '#333322',
               }}
            >
               No recipes were found
            </p>
         )}
         {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
         ))}
      </div>
   );
};

export default RecipeCardList;
