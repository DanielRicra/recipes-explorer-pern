import { Link } from 'react-router-dom';

import './notFound.less';

const NotFound = () => {
   return (
      <div className='not-found'>
         <h2>
            Oh, No! This page
            <br /> does not exist.
         </h2>
         <button type='button' className='button'>
            <Link to='/'>Go back LandingPage</Link>
         </button>
      </div>
   );
};

export default NotFound;
