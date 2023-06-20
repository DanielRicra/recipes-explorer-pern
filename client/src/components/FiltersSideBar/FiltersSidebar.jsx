/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import MultiSelectAccordion from '../Accordions/MultiSelectAccordion';
import { useDiets } from '../../hooks/useDiets';
import './filtersSidebar.less';
import { actionTypes } from '../../utils/constants';

const FiltersSidebar = () => {
   const [selectedFilters, setSelectedFilters] = useState([]);
   const { diets, loading, error } = useDiets();
   const dispatch = useDispatch();

   const addToSelectedFilters = (e) => {
      const { checked, name } = e.target;
      if (checked) {
         setSelectedFilters([...selectedFilters, name]);
      } else {
         setSelectedFilters(selectedFilters.filter((item) => item !== name));
      }
   };

   useEffect(() => {
      dispatch({ type: actionTypes.SET_VISIBILITY_FILTER, payload: selectedFilters });
   }, [selectedFilters]);

   return (
      <div className='filters-sidebar'>
         <MultiSelectAccordion
            title='Type of Diet'
            options={diets}
            addToSelectedFilters={addToSelectedFilters}
         />
         <p>{loading && 'Fetching diets...'}</p>
         <p className='error-message'>{error && `Diets: ${error}`}</p>

         <MultiSelectAccordion
            title='Data Source From'
            options={[
               { id: 1, name: 'Spoonacular API' },
               { id: 2, name: 'Recipe Explorer API' },
            ]}
            addToSelectedFilters={addToSelectedFilters}
         />
      </div>
   );
};

export default FiltersSidebar;
