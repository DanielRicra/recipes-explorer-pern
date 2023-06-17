import { useState } from 'react';

import TextField from '../../../components/CustomInputs/TextField';
import { ReactComponent as IconPlus } from '../../../assets/plus.svg';

const Instructions = () => {
   const [instruction, setInstruction] = useState({ name: '', steps: [] });
   const [step, setStep] = useState({ step: '', number: 1 });
   const [stepError, setStepError] = useState(false);

   const handleInstructionNameChange = (e) => {
      setInstruction((prev) => ({ ...prev, name: e.target.value }));
   };

   const handleStepChange = (e) => {
      setStep((prev) => ({ ...prev, step: e.target.value }));
   };

   const handleAddStep = () => {
      if (step.step.trim() === '') {
         setStepError(true);
         return;
      }

      setInstruction((prev) => ({
         ...prev,
         steps: [...prev.steps, step],
      }));
      setStep((prev) => ({ step: '', number: prev.number + 1 }));
      setStepError(false);
   };

   return (
      <div className='create-recipe-instructions'>
         <h3>Instructions</h3>

         <div className='input-box'>
            <TextField
               name='name'
               placeholder={'Name'}
               value={instruction.name}
               handleChange={handleInstructionNameChange}
            />
         </div>

         <h4>Steps</h4>

         <div className='steps'>
            {instruction.steps.map((step) => (
               <div key={step.number} className='step'>
                  <span>{step.number}.</span>
                  <p>{step.step}</p>
               </div>
            ))}
         </div>

         <div className='add-step-form'>
            <p>{step.number}.</p>
            <div className='input-box'>
               <input
                  name='step'
                  placeholder={'Description'}
                  className={stepError ? 'error' : ''}
                  value={step.step}
                  onChange={handleStepChange}
               />
               {stepError && <p className='error-message'>Step cannot be empty</p>}
            </div>
            <div>
               <button onClick={handleAddStep} type='button' title='Add step'>
                  <IconPlus />
               </button>
            </div>
         </div>
      </div>
   );
};

export default Instructions;
