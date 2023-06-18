import './textField.less';

const TextField = ({
   handleChange,
   value,
   error = false,
   errorMessage,
   name,
   label,
   type = 'text',
   autoFocus = false,
   placeholder,
}) => {
   return (
      <>
         <label htmlFor={name} className='text-field-label'>
            {label}
         </label>
         <input
            className={error ? 'text-field-input error' : 'text-field-input'}
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
