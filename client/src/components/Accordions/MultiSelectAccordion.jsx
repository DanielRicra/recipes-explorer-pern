import { ReactComponent as ChevronDown } from '../../assets/chevron-down.svg';
import CustomCheckBox from '../CustomInputs/CustomCheckBox';
import './index.less';

const MultiSelectAccordion = ({ addToSelectedFilters, title, options }) => {
   return (
      <div className='multi-select-accordion'>
         <label
            className='filter-accordion-title'
            htmlFor={`accordion-title-${title}`}
         >
            <input type='checkbox' name='accordion-title' id={`accordion-title-${title}`} />
            <h2>{title}</h2>
            <ChevronDown />
         </label>

         <div
            className='filter-accordion-content'
            style={{ '--height': options.length * 30 + 'px' }}
         >
            {options.map((option, index) => (
               <CustomCheckBox
                  key={`${option}-${index}`}
                  labelText={option}
                  onChange={addToSelectedFilters}
               />
            ))}
         </div>
      </div>
   );
};

export default MultiSelectAccordion;
