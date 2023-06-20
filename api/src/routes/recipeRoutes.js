import { Router } from 'express';
import recipeController from '../controllers/recipeController.js';

const router = Router();

router.get('/', recipeController.getAllRecipes);

router.get('/name', recipeController.getAllRecipes);

router.get('/:recipeId', recipeController.getRecipeById);

router.post('/', recipeController.createNewRecipe);

router.patch('/:recipeId', recipeController.updateRecipe);

router.delete('/:recipeId', recipeController.deleteRecipeById);

export default router;
