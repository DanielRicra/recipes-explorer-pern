import { actionTypes } from '../../utils/constants';

export const INITIAL_STATE = {
   data: {},
   loading: false,
   error: null,
};

export const createRecipeReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case actionTypes.FETCH_START:
         return {
            ...state,
            loading: true,
            error: null,
         };
      case actionTypes.FETCH_SUCCESS:
         return {
            ...state,
            loading: false,
            data: action.payload,
         };
      case actionTypes.FETCH_ERROR:
         return {
            ...state,
            loading: false,
            error: action.payload,
         };
      default:
         return state;
   }
};
