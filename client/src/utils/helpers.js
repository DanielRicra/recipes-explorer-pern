export const convertNumeric = (value) => {
   const numeric = parseFloat(value);

   if (isNaN(numeric)) {
      return '';
   }

   return numeric;
};
