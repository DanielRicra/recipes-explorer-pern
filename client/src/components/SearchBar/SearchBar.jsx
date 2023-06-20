import { useDispatch } from  'react-redux';
import { useRef } from 'react';

import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg';
import { setSearchRecipes } from '../../redux/thunkMiddlewares';
import './searchBar.less';

const SearchBar = () => {
   const dispatch = useDispatch();
   const inputRef = useRef();

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
         <button type='submit' title='search'>
            <SearchIcon strokeWidth='1.5' width={20} height={20} />
         </button>
      </form>
   );
};

export default SearchBar;
