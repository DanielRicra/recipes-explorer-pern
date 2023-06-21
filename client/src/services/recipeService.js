import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/v1/recipes';

const getAllRecipes = async ({ offset = 0, limit = 10 }) => {
   const response = await axios.get(
      `${BASE_URL}?offset=${offset}&limit=${limit}`
   );
   return response.data;
};

const getRecipeByName = async ({ name, offset = 0, limit }) => {
   const response = await axios.get(
      `${BASE_URL}/name?name=${name}&offset=${offset}&limit=${limit}`
   );
   return response.data;
};

const createNewRecipe = async (recipe) => {
   const response = await axios.post(BASE_URL, recipe);
   return response.data;
};

const getRecipeById = async (id) => {
   const response = await axios.get(`${BASE_URL}/${id}`);
   return response.data;
};

export default {
   getAllRecipes,
   createNewRecipe,
   getRecipeById,
   getRecipeByName,
};