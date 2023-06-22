import './landing.less';
import landingImg from '../../assets/dish.webp';
import recipeOne from '../../assets/Resize_landing-card-one.webp';
import recipeTwo from '../../assets/Resize_landing-recipe-card-two.webp';
import LandingRecipeCard from './LandingRecipeCard';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
   const navigate = useNavigate();

   const goToHome = () => {
      navigate('/home');
   };

   return (
      <div className='landing' style={{ minHeight: window.innerHeight - 93 }}>
         <div className='landing-info'>
            <h1>Let&apos;s cook with the most delicious recipes</h1>
            <p>
               Start learning how to cook with us today! We will guide you
               through the process of cooking with us and you will be able to
               enjoy the best recipes ever!
            </p>

            <button type='button' className='button' onClick={goToHome}>
               Start searching
            </button>
         </div>

         <div className='landing-img'>
            <img
               src={landingImg}
               alt='Food'
               width={400}
               height={400}
               title='Food landing image'
            />

            <div className='landing-recipes'>
               <LandingRecipeCard
                  image={recipeOne}
                  ingredients='Peaches, Ground ancho chile pepper, Butter, Sharp white Cheddar cheese'
                  calories={137}
                  title='Peach Pie'
               />
            </div>

            <div className='landing-recipes'>
               <LandingRecipeCard
                  image={recipeTwo}
                  title='Keto Fruit Salad'
                  ingredients='Strawberries, Blueberries, Raspberries, Whipped Light Cream'
                  calories={865}
               />
            </div>
         </div>
      </div>
   );
};

export default Landing;
