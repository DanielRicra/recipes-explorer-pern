import { useRef } from 'react';

import { ReactComponent as IconPlus } from '../../../assets/plus.svg';
import { ReactComponent as IconX } from '../../../assets/x.svg';
import IngredientModalForm from './IngredientModalForm';
import { ACTION_TYPES } from '../recipeFormActionTypes';

const IngredientList = ({ extendedIngredients, dispatch }) => {
   const modalRef = useRef(null);

   const openModal = () => {
      modalRef.current?.showModal();
   };

   const closeModal = () => {
      modalRef.current?.close();
   };

   const addIngredient = (ingredient) => {
      dispatch({ type: ACTION_TYPES.SET_EXTENDED_INGREDIENT, payload: ingredient });
      closeModal();
   };

   const removeIngredient = (ingredientName) => {
      dispatch({ type: ACTION_TYPES.REMOVE_EXTENDED_INGREDIENT, payload: ingredientName });
   };

   return (
      <>
         <div className='create-recipe-ingredients'>
            <h3>Ingredients</h3>

            <div className='ingredient-list'>
               {extendedIngredients.map((eIngredient, index) => (
                     <div key={index} className='ingredient-item'>
                        <img
                           src={eIngredient.image}
                           alt='ingredient'
                           title={`${eIngredient.name} image`}
                           width={100}
                           height={100}
                        />
                        <div className='ingredient-info'>
                           <p>{eIngredient.name}</p>
                           <p>
                              {eIngredient.recipe_ingredient.amount} {eIngredient.recipe_ingredient.unit}
                           </p>
                        </div>

                        <div className='ingredient-buttons'>
                           <button
                              type='button'
                              onClick={() => removeIngredient(eIngredient.name)}
                           >
                              <IconX />
                           </button>
                        </div>
                     </div>
               ))}
            </div>

            <div className='add-ingredient-btn' onClick={openModal}>
               <IconPlus />
               <p>Add ingredient</p>
            </div>
         </div>
         <dialog ref={modalRef} className='add-ingredient-dialog'>
            <IngredientModalForm
               addIngredient={addIngredient}
               closeModal={closeModal}
            />
         </dialog>
      </>
   );
};

export default IngredientList;
