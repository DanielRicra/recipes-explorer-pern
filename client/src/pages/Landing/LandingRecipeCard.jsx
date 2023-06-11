import { ReactComponent as FlameIcon } from '../../assets/flame.svg';

const LandingRecipeCard = ({ image, title, ingredients, calories }) => {
   return (
      <div className='landing-recipe-card'>
         <div className='landing-recipe-title'>
            <img
               src={image}
               alt='Food'
               width={44}
               height={44}
               title={`${title} image`}
            />
            <div className='landing-recipe-text'>
               <h3>{title}</h3>
               <div title='calories'>
                  <FlameIcon
                     width={18}
                     height={18}
                     stroke='#ff5a00'
                     fill='#ffe808'
                  />{' '}
                  <p>{calories}</p>
               </div>
            </div>
         </div>
         <p className='landing-recipe-ingredients'>{ingredients}</p>
      </div>
   );
};

export default LandingRecipeCard;
