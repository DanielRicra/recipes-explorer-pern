import { ReactComponent as ChevronLeft } from '../../assets/chevron-left.svg';
import { ReactComponent as ChevronRight } from '../../assets/chevron-right.svg';
import './index.less';

const Pagination = ({ currentPage, totalPages, paginate }) => {
   const previous = () => {
      if (currentPage > 1) {
         paginate(currentPage - 1);
      }
   };

   const next = () => {
      if (currentPage < totalPages) {
         paginate(currentPage + 1);
      }
   };

   return (
      <ul className='pagination'>
         <li className='page-item'>
            <span
               onClick={previous}
               className={currentPage === 1 ? 'disabled' : ''}
            >
               <ChevronLeft />
            </span>
         </li>

         {Array(totalPages).fill(true).map((_number, index) => (
            <li key={index} className='page-item'>
               <span
                  onClick={() => paginate(index + 1)}
                  className={`${currentPage === index + 1 ? 'active' : ''}`}
               >
                  {index + 1}
               </span>
            </li>
         ))}

         <li className='page-item'>
            <span
               onClick={next}
               className={currentPage === totalPages ? 'disabled' : ''}
            >
               <ChevronRight />
            </span>
         </li>
      </ul>
   );
};

export default Pagination;
