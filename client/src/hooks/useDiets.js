import { useEffect, useState } from 'react';
import dietService from '../services/dietService';

export const useDiets = () => {
   const [diets, setDiets] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const getAllDiets = async () => {
         setLoading(true);
         try {
            const data = await dietService.getAllDiets();
            setDiets(data);
         } catch (error) {
            console.log(error);
         } finally {
            setLoading(false);
         }
      };

      getAllDiets();
   }, []);

   return { diets, loading };
};
