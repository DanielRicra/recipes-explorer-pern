/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import {
   FiltersSideBar,
   Pagination,
   RecipeCardList,
   SearchBar,
} from '../../components';
import { actionTypes, orderTypes } from '../../utils/constants';
import recipesData from '../../utils/recipesData.json';
import './home.less';
import { compareWords } from '../../utils/helpers';

const Home = () => {
   const [currentPage, setCurrentPage] = useState(1);
   const dispatch = useDispatch();

   const filteredRecipes = useSelector((state) => {
      const orderType = state.visibilityOrder;
      const filters = state.visibilityFilter.byDiets;
      const source = state.visibilityFilter.bySource;
      let recipes = state.recipes.values;

      switch (orderType) {
         case orderTypes.TITLE_ASC:
            recipes = recipes.toSorted((a, b) =>
               compareWords(a.title, b.title)
            );
            break;
         case orderTypes.TITLE_DESC:
            recipes = recipes.toSorted((a, b) =>
               compareWords(b.title, a.title)
            );
            break;
         case orderTypes.HEALTH_SCORE_ASC:
            recipes = recipes.toSorted((a, b) => a.healthScore - b.healthScore);
            break;
         case orderTypes.HEALTH_SCORE_DESC:
            recipes = recipes.toSorted((a, b) => b.healthScore - a.healthScore);
            break;
         default:
            break;
      }

      if (source.length === 1 && source[0] === 'Spoonacular API') {
         recipes = recipes.filter((recipe) => {
            return Object.hasOwn(recipe, 'title');
         });
      }

      if (source.length === 1 && source[0] === 'Recipe Explorer API') {
         recipes = recipes.filter((recipe) => {
            return Object.hasOwn(recipe, 'name');
         });
      }

      if (filters.length === 0) {
         return recipes;
      }
      return recipes.filter((recipe) => {
         return recipe.diets.some((diet) => {
            return filters.includes(diet);
         });
      });
   });

   const currentRecipes = filteredRecipes.slice(
      (currentPage - 1) * 9,
      currentPage * 9
   );

   const paginate = (page) => {
      setCurrentPage(page);
   };

   const handleOrder = (e) => {
      dispatch({
         type: actionTypes.SET_VISIBILITY_ORDER,
         payload: e.target.value,
      });
   };

   useEffect(() => {
      dispatch({ type: actionTypes.FETCH_SUCCESS, payload: recipesData });
   }, []);

   return (
      <div className='home'>
         <div className='home-search-bar'>
            <SearchBar />
         </div>
         <div className='home-content'>
            <div className='home-filters-side-bar'>
               <FiltersSideBar paginate={paginate} />
            </div>

            <div className='home-recipe-results'>
               <div className='home-recipe-results-header'>
                  <label htmlFor='sortBy'>
                     Sort by:&nbsp;
                     <select
                        name='sortBy'
                        id='sortBy'
                        defaultValue={'none'}
                        onChange={handleOrder}
                     >
                        <option value={'none'} disabled>
                           --select--
                        </option>

                        <option value={orderTypes.TITLE_ASC}>
                           Name asc(A-Z)
                        </option>
                        <option value={orderTypes.TITLE_DESC}>
                           Name desc(Z-A)
                        </option>
                        <option value={orderTypes.HEALTH_SCORE_ASC}>
                           Health Score low to high
                        </option>
                        <option value={orderTypes.HEALTH_SCORE_DESC}>
                           Health Score high to low
                        </option>
                     </select>
                  </label>
               </div>
               <p>
                  {`Showing ${currentRecipes.length} of ${filteredRecipes.length} recipes`}
               </p>
               <RecipeCardList recipes={currentRecipes} />

               <div className='home-recipe-results-pagination'>
                  <Pagination
                     currentPage={currentPage}
                     totalPages={Math.ceil(filteredRecipes.length / 9)}
                     paginate={paginate}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;
