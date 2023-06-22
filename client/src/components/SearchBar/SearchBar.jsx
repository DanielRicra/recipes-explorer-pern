import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';

import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg';
import { setSearchRecipes } from '../../redux/thunkMiddlewares';
import './searchBar.less';

const SearchBar = () => {
   const dispatch = useDispatch();
   const inputRef = useRef();
   const loading = useSelector((state) => state.recipes.status);

   const handleSubmit = (event) => {
      event.preventDefault();

      const value = inputRef.current?.value.trim() ?? '';

      if (value === '') {
         return;
      }

      dispatch(setSearchRecipes(value));
   };

   return (
      <form className='search-bar' onSubmit={handleSubmit}>
         <input type='text' placeholder='Search...' ref={inputRef} />
         <button
            type='submit'
            title='search'
            disabled={loading === 'loading' ? true : false}
            className={loading === 'loading' ? 'animate-pulse' : ''}
         >
            <SearchIcon strokeWidth='1.5' width={20} height={20} />
         </button>
      </form>
   );
};

export default SearchBar;
