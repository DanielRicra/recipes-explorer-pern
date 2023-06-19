import { useState } from 'react';

import MultiSelectAccordion from '../Accordions/MultiSelectAccordion';
import './filtersSidebar.less';
import { useDiets } from '../../hooks/useDiets';

const FiltersSidebar = () => {
   const [selectedFilters, setSelectedFilters] = useState([]);
   const { diets } = useDiets();

   const addToSelectedFilters = (e) => {
      const { checked, name } = e.target;
      if (checked) {
         setSelectedFilters([...selectedFilters, name]);
      } else {
         setSelectedFilters(selectedFilters.filter((item) => item !== name));
      }
   };

   return (
      <div className='filters-sidebar'>
         <MultiSelectAccordion
            title='Type of Diet'
            options={diets.map((diet) => diet.name)}
            addToSelectedFilters={addToSelectedFilters}
         />

         <MultiSelectAccordion
            title='Data Source From'
            options={['Spoonacular API', 'Recipe Explorer API']}
            addToSelectedFilters={addToSelectedFilters}
         />
      </div>
   );
};

export default FiltersSidebar;
