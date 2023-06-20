import { combineReducers } from 'redux';

import visibilityFilter from './visibilityFilter';
import visibilityOrder from './visibilityOrder';
import recipes from './recipes';

const rootReducer = combineReducers({
    recipes,
    visibilityFilter,
    visibilityOrder,
});

export default rootReducer;