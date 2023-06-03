import { describe, it, expect } from 'vitest';

function multiply(a, b) {
   if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('parameters must be numbers');
   }
   
   return a * b;
}

describe('multiply()', () => { 
   it('should multiply two numbers', () => { 
      const result = multiply(2, 3);
      console.log(multiply(2, 3));
      expect(result).toBe(6);
   });

   it('should throw an error if any of the arguments is not a number', () => { 
      expect(() => { 
         multiply(2, '3');
      }).toThrow();
   });
});