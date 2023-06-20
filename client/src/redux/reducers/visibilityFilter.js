import { actionTypes } from '../../utils/constants';

const initialState = {
   byDiets: [],
   bySource: [],
};

const visibilityFilter = (state = initialState, action) => {
   if (action.type === actionTypes.SET_DIET_FILTER) {
      return {
         ...state,
         byDiets: action.payload,
      };
   } else if (action.type === actionTypes.SET_SOURCE_FILTER) {
      return {
         ...state,
         bySource: action.payload,
      };
   }
   return state;
};

export default visibilityFilter;
