import { actionTypes } from '../../utils/constants';

const visibilityOrder = (state = 'none', action) => {
   if (action.type === actionTypes.SET_VISIBILITY_ORDER) {
      return action.payload;
   }

   return state;
};

export default visibilityOrder;
