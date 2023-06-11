import { ReactComponent as FlameIcon } from '../../assets/flame.svg';

const LandingRecipeCard = ({ image, title, ingredients, calories }) => {
   return (
      <div className='landing-recipe-card'>
         <div className='landing-recipe-title'>
            <img
               src={image}
               alt='Food'
               width={50}
               height={50}
               title={`${title} image`}
            />
            <div className='flex-start column'>
               <h3>{title}</h3>
               <div className='center flex-end'>
                  <FlameIcon width={18} height={18} stroke='#ff5a00' fill='#ffe808' /> <p>{calories}</p>
               </div>
            </div>
         </div>
         <p className='landing-recipe-ingredients'>{ingredients}</p>
      </div>
   );
};

export default LandingRecipeCard;
