import { useRef, useState } from 'react';

import { ReactComponent as IconPlus } from '../../../assets/plus.svg';
import { ReactComponent as IconX } from '../../../assets/x.svg';
import IngredientModalForm from './IngredientModalForm';

const IngredientList = () => {
   const modalRef = useRef(null);
   const [ingredients, setIngredients] = useState([]);

   const openModal = () => {
      modalRef.current?.showModal();
   };

   const closeModal = () => {
      modalRef.current?.close();
   };

   const addIngredient = (ingredient) => {
      setIngredients((prev) => [...prev, ingredient]);
      closeModal();
   };

   const removeIngredient = (ingredientName) => {
      setIngredients((prev) =>
         prev.filter((ingredient) => ingredient.name !== ingredientName)
      );
   };

   return (
      <>
         <div className='create-recipe-ingredients'>
            <h3>Ingredients</h3>

            <div className='ingredient-list'>
               {ingredients.map((ingredient, index) => (
                     <div key={index} className='ingredient-item'>
                        <img
                           src={ingredient.image}
                           alt='ingredient'
                           title={`${ingredient.name} image`}
                           width={100}
                           height={100}
                        />
                        <div className='ingredient-info'>
                           <p>{ingredient.name}</p>
                           <p>
                              {ingredient.amount} {ingredient.unit}
                           </p>
                        </div>

                        <div className='ingredient-buttons'>
                           <button
                              type='button'
                              onClick={() => removeIngredient(ingredient.name)}
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
