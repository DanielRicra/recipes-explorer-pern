import { actionTypes } from '../../utils/constants';

export const INITIAL_STATE = {
   recipe: {},
   loading: false,
   error: null,
};

export const recipeReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case actionTypes.FETCH_START:
         return { ...state, error: null, loading: true, recipe: {} };
      case actionTypes.FETCH_SUCCESS:
         return { ...state, loading: false, recipe: action.payload };
      case actionTypes.FETCH_ERROR:
         return { ...state, loading: false, error: action.payload, recipe: {} };
      default:
         return state;
   }
};
