import './searchBar.less';
import { ReactComponent as SearchIcon } from '../../assets/search-icon.svg';

const SearchBar = () => {
   return (
      <div className='search-bar'>
         <SearchIcon strokeWidth='1' width={20} height={20} fill='#fff' />
         <input type='text' placeholder='Search...' />
      </div>
   );
};

export default SearchBar;
