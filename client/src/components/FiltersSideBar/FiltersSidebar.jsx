import { useState } from 'react';

import MultiSelectAccordion from '../Accordions/MultiSelectAccordion';
import './filtersSidebar.less';

const FiltersSidebar = () => {
   const [selectedFilters, setSelectedFilters] = useState([]);

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
            options={[
               'vegan',
               'vegetarian',
               'pescetarian',
               'paleo',
               'ketogenic',
               'gluten free',
            ]}
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
