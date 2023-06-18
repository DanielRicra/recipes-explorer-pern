import { ACTION_TYPES } from './recipeFormActionTypes';

export const INITIAL_STATE = {
   image: '',
   name: '',
   summary: '',
   readyInMinutes: '',
   healthScore: '',
   servings: '',
   diets: [],
   extendedIngredients: [],
   instructions: {
      name: '',
      steps: [],
   },
};

export const recipeFormReducer = (state, action) => {
   switch (action.type) {
      case ACTION_TYPES.INPUT_CHANGE:
         return {
            ...state,
            [action.payload.name]: action.payload.value,
         };
      case ACTION_TYPES.SET_DIET:
         return {
            ...state,
            diets: [...state.diets, action.payload],
         };
      case ACTION_TYPES.REMOVE_DIET:
         return {
            ...state,
            diets: state.diets.filter((diet) => diet !== action.payload),
         };
      case ACTION_TYPES.SET_EXTENDED_INGREDIENT:
         return {
            ...state,
            extendedIngredients: [...state.extendedIngredients, action.payload],
         };
      case ACTION_TYPES.REMOVE_EXTENDED_INGREDIENT:
         return {
            ...state,
            extendedIngredients: state.extendedIngredients.filter(
               (ingredient) => ingredient.name !== action.payload
            ),
         };
      case ACTION_TYPES.SET_INSTRUCTIONS_NAME:
         return {
            ...state,
            instructions: {
               ...state.instructions,
               name: action.payload,
            },
         };
      case ACTION_TYPES.ADD_STEP:
         return {
            ...state,
            instructions: {
               ...state.instructions,
               steps: [...state.instructions.steps, action.payload],
            },
         };
      case ACTION_TYPES.REMOVE_STEP: {
         const newSteps = state.instructions.steps
            .filter((step) => step.number !== action.payload)
            .map((step, index) => ({ ...step, number: index + 1 }));

         return {
            ...state,
            instructions: {
               ...state.instructions,
               steps: newSteps,
            },
         };
      }
      default:
         return state;
   }
};
