import { useRef, useState } from 'react';

import TextField from '../../../components/CustomInputs/TextField';
import { ReactComponent as IconPlus } from '../../../assets/plus.svg';
import { ReactComponent as IconX } from '../../../assets/x.svg';
import { ACTION_TYPES } from '../recipeFormActionTypes';

const Instructions = ({ instructions, dispatch }) => {
   const stepRef = useRef(null);
   const [stepError, setStepError] = useState(false);

   const handleInstructionNameChange = (e) => {
      dispatch({
         type: ACTION_TYPES.SET_INSTRUCTIONS_NAME,
         payload: e.target.value,
      });
   };

   const handleAddStep = () => {
      if (!stepRef.current || stepRef.current.value.trim() === '') {
         setStepError(true);
         return;
      }

      const number = instructions.steps.length + 1;
      dispatch({
         type: ACTION_TYPES.ADD_STEP,
         payload: { number, step: stepRef.current.value.trim() },
      });

      stepRef.current.value = '';
      setStepError(false);
   };

   const handleRemoveStep = (number) => {
      dispatch({ type: ACTION_TYPES.REMOVE_STEP, payload: number });
   };

   return (
      <div className='create-recipe-instructions'>
         <h3>Instructions</h3>

         <div className='input-box'>
            <TextField
               name='name'
               placeholder='Name (Optional)'
               value={instructions.name}
               handleChange={handleInstructionNameChange}
               label='name (Optional)'
            />
         </div>

         <h4>Steps</h4>

         <div className='steps'>
            {instructions.steps.map((step) => (
               <div key={step.number} className='step'>
                  <span>{step.number}.</span>
                  <div className='step-content'>
                     <p>{step.step}</p>

                     <div className='step-buttons'>
                        <button
                           onClick={() => handleRemoveStep(step.number)}
                           type='button'
                           title='Remove step'
                           className='icon-button delete-button'
                        >
                           <IconX />
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         <div className='add-step-form'>
            <p>{instructions.steps.length + 1}.</p>
            <div className='input-box'>
               <input
                  name='step'
                  placeholder={'Description'}
                  className={stepError ? 'error' : ''}
                  ref={stepRef}
               />
               {stepError && (
                  <p className='error-message'>Step cannot be empty</p>
               )}
            </div>
            <div>
               <button
                  onClick={handleAddStep}
                  type='button'
                  title='Add step'
                  className='icon-button'
               >
                  <IconPlus />
               </button>
            </div>
         </div>
      </div>
   );
};

export default Instructions;
