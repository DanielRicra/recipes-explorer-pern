import { actionTypes } from '../utils/constants';

export const setVisibilityFilter = (filter) => ({
   type: actionTypes.SET_VISIBILITY_FILTER,
   payload: filter,
});

export const setVisibilityOrder = (order) => ({
   type: actionTypes.SET_VISIBILITY_ORDER,
   payload: order,
});

export const fetchStart = () => ({
   type: actionTypes.FETCH_START,
});

export const setRecipes = (recipes) => ({
   type: actionTypes.FETCH_SUCCESS,
   payload: recipes,
});

export const fetchError = (error) => ({
   type: actionTypes.FETCH_ERROR,
   payload: error,
});
