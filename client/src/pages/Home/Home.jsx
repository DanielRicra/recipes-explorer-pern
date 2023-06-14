import { useState } from 'react';

import {
   FiltersSideBar,
   Pagination,
   RecipeCardList,
   SearchBar,
} from '../../components';
import './home.less';

const Home = () => {
   const [currentPage, setCurrentPage] = useState(1);

   const paginate = (page) => {
      setCurrentPage(page);
   };

   return (
      <div className='home'>
         <div className='home-search-bar'>
            <SearchBar />
         </div>
         <div className='home-content'>
            <div className='home-filters-side-bar'>
               <FiltersSideBar />
            </div>

            <div className='home-recipe-results'>
               <div className='home-recipe-results-header'>
                  <label htmlFor='sortBy'>
                     Sort by:&nbsp;
                     <select name='sortBy' id='sortBy' defaultValue={'asc'}>
                        <option value='asc'>Name asc(A-Z)</option>
                        <option value='desc'>Name desc(Z-A)</option>
                        <option value='hsLH'>Health Score low to high</option>
                        <option value='hsHL'>Health Score high to low</option>
                     </select>
                  </label>
               </div>

               <RecipeCardList />

               <div className='home-recipe-results-pagination'>
                  <Pagination
                     currentPage={currentPage}
                     totalPages={10}
                     paginate={paginate}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;
