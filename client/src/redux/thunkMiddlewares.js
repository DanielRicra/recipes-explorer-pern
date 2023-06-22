import { AxiosError } from 'axios';
import recipeService from '../services/recipeService';
import { fetchError, fetchStart, setRecipes } from './actions';

export const setSearchRecipes = (searchQuery) => {
   return async (dispatch) => {
      try {
         dispatch(fetchStart());
         const data = await recipeService.getRecipeByName({ name: searchQuery, limit: 30 });
         dispatch(setRecipes(data.results));
      } catch (error) {
         if (error instanceof AxiosError) {
            dispatch(fetchError(error.response?.data.error));
            return;
         }
         dispatch(fetchError(error.message));
      }
   };
};

export const setAllRecipes = () => {
   return async (dispatch) => {
      try {
         dispatch(fetchStart());
         const data = await recipeService.getAllRecipes({ limit: 27 });
         dispatch(setRecipes(data.results));
      } catch (error) {
         if (error instanceof AxiosError) {
            dispatch(fetchError(error.response?.data.error));
            return;
         }
         dispatch(fetchError(error.message));
      }
   };
};
