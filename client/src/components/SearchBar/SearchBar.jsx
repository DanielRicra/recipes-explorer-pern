import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg';
import './searchBar.less';

const SearchBar = () => {

   const handleSubmit = (event) => {
      event.preventDefault();
   };

   return (
      <form className='search-bar' onSubmit={handleSubmit}>
         <input type='text' placeholder='Search...' />
         <button type='submit' title='search'>
            <SearchIcon strokeWidth='1.5' width={20} height={20} />
         </button>
      </form>
   );
};

export default SearchBar;
