export const convertNumeric = (value) => {
   const numeric = parseFloat(value);

   if (isNaN(numeric)) {
      return '';
   }

   return numeric;
};

export const compareWords = (a, b) => {
   if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
   }

   if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
   }

   return 0;
};