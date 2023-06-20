import { ReactComponent as ChevronDown } from '../../assets/chevron-down.svg';
import CustomCheckBox from '../CustomInputs/CustomCheckBox';
import './multiSelectAccordion.less';

const MultiSelectAccordion = ({ addToSelectedFilters, title, options, styles }) => {
   return (
      <div className='multi-select-accordion' style={styles}>
         <label
            className='filter-accordion-title'
            htmlFor={`accordion-title-${title}`}
         >
            <input type='checkbox' name='accordion-title' id={`accordion-title-${title}`} />
            <h3 className='filter-accordion-title-text'>{title}</h3>
            <ChevronDown />
         </label>

         <div
            className='filter-accordion-content'
            style={{ '--height': options.length * 30 + 'px' }}
         >
            {options.map((option) => (
               <CustomCheckBox
                  key={`${option.id}`}
                  labelText={option.name}
                  id={option.id}
                  onChange={addToSelectedFilters}
               />
            ))}
         </div>
      </div>
   );
};

export default MultiSelectAccordion;
