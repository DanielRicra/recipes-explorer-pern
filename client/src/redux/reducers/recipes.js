import { actionTypes } from '../../utils/constants';

const initialState = {
   values: [],
   status: 'idle',
   error: null,
};

const recipes = (state = initialState, action) => {
   const { type, payload } = action;

   switch (type) {
      case actionTypes.FETCH_START:
         return {
            ...state,
            error: null,
            status: 'loading',
         };
      case actionTypes.FETCH_SUCCESS:
         return {
            ...state,
            values: payload,
            status: 'fulfilled',
         };
      case actionTypes.FETCH_ERROR:
         return {
            ...state,
            error: payload,
            status: 'rejected',
         };
      case actionTypes.ADD_RECIPE:
         return {
            ...state,
            values: [...state.values, payload],
         };
      default:
         return state;
   }
};

export const getAllRecipes = (state) => state.recipes.values;

export default recipes;
