import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/v1/diets';

const getAllDiets = async () => {
   const response = await axios.get(BASE_URL);
   return response.data;
};

export default {
   getAllDiets,
};
