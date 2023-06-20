/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import MultiSelectAccordion from '../Accordions/MultiSelectAccordion';
import { useDiets } from '../../hooks/useDiets';
import './filtersSidebar.less';
import { actionTypes } from '../../utils/constants';

const FiltersSidebar = ({ paginate }) => {
   const [selectedFilters, setSelectedFilters] = useState([]);
   const [sourceFilters, setSourceFilters] = useState([]);
   const { diets, loading, error } = useDiets();
   const dispatch = useDispatch();

   const addToSelectedFilters = (e) => {
      const { checked, name } = e.target;
      if (checked) {
         setSelectedFilters((prev) => [...prev, name]);
      } else {
         setSelectedFilters(selectedFilters.filter((item) => item !== name));
      }
   };

   const addToSourceFilters = (e) => {
      const { checked, name } = e.target;
      if (checked) {
         setSourceFilters((prev) => [...prev, name]);
      } else {
         setSourceFilters(sourceFilters.filter((item) => item !== name));
      }
   };
   
   useEffect(() => {
      dispatch({ type: actionTypes.SET_DIET_FILTER, payload: selectedFilters });
      paginate(1);
   }, [selectedFilters]);

   useEffect(() => {
      dispatch({ type: actionTypes.SET_SOURCE_FILTER, payload: sourceFilters });
   }, [sourceFilters]);

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
            addToSelectedFilters={addToSourceFilters}
         />
      </div>
   );
};

export default FiltersSidebar;
