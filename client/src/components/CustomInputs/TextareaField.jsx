import './textField.less';

const TextField = ({
   handleChange,
   value,
   error = false,
   errorMessage,
   name,
   type = 'text',
   autoFocus = false,
   placeholder,
}) => {
   return (
      <>
         <label htmlFor={name} className='text-field-label'>
            {name}
         </label>
         <textarea
            className={error ? 'text-field-textarea error' : 'text-field-textarea'}
            type={type}
            id={name}
            placeholder={placeholder}
            name={name}
            onChange={handleChange}
            value={value}
            autoFocus={autoFocus}
         />
         {error && <p className='text-field-error-message'>{errorMessage}</p>}
      </>
   );
};

export default TextField;
