import { useEffect, useState } from 'react';
import dietService from '../services/dietService';

export const useDiets = () => {
   const [diets, setDiets] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
      const getAllDiets = async () => {
         setLoading(true);
         setError(null);
         try {
            const data = await dietService.getAllDiets();
            setDiets(data);
         } catch (error) {
            setError(error.message);
         } finally {
            setLoading(false);
         }
      };

      getAllDiets();
   }, []);

   return { diets, loading, error };
};
