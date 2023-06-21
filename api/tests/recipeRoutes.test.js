import app from '../src/app.js';
import request from 'supertest';

const api = request(app);

describe('Recipes', () => {
   const recipeData = {
      readyInMinutes: 20,
      name: 'new recipe 1',
      healthScore: 20,
      image: 'new.recipe.com',
      summary: 'This new recipe 4 is insane',
      servings: 6,
      dietsId: [2, 8],
      extendedIngredients: [
         {
            name: 'Baking Powder',
            image: 'www.google.com',
            recipe_ingredient: {
               amount: 2,
               unit: 'tablespoon',
            },
         },
         {
            name: 'eggs',
            image: 'www.google.com',
            recipe_ingredient: {
               amount: 8,
               unit: 'unity',
            },
         },
      ],
      analyzedInstructions: [
         {
            name: 'Make the biscuit',
            steps: [
               {
                  step: 'Put the eggs in a bowl',
                  number: 1,
               },
               {
                  step: 'Put the baking powder in a bowl',
                  number: 2,
                  length: '1 minute',
               },
            ],
         },
         {
            name: 'Make the cream',
            steps: [
               {
                  step: 'Put the 8 eggs in a bowl',
                  number: 1,
               },
               {
                  step: 'Put the milk in a bowl and shake it off',
                  number: 2,
                  length: '3 minute',
               },
            ],
         },
      ],
   };
   const badRecipeData = {
      readyInMinutes: 20,
      name: 'new recipe 1',
      healthScore: 20,
   };
   describe('POST /api/v1/recipes', () => {
      it('should return 201 Created', async () => {
         const response = await api.post('/api/v1/recipes').send(recipeData);
         expect(response.status).toBe(201);
         expect(response.body).toHaveProperty('id');
         expect(response.body).toHaveProperty('name', recipeData.name);
         expect(response.body).toHaveProperty('summary', recipeData.summary);
         expect(response.body).toHaveProperty('servings', recipeData.servings);
         expect(response.body).toHaveProperty(
            'healthScore',
            recipeData.healthScore
         );
         expect(response.body).toHaveProperty('image', recipeData.image);
         expect(response.body).toHaveProperty(
            'readyInMinutes',
            recipeData.readyInMinutes
         );
         expect(response.body).toHaveProperty('diets');
         expect(response.body).toHaveProperty('ingredients');
         expect(response.body).toHaveProperty('analyzed_instructions');
      });

      it('should return 400 Bad Request if recipe has no name', async () => {
         const response = await api.post('/api/v1/recipes').send(badRecipeData);
         expect(response.status).toBe(400);
      });
   });

   describe('GET /api/v1/recipes/:id', () => { 
      it('should return 200 OK', async () => {
         const response = await api.get('/api/v1/recipes/1');
         expect(response.status).toBe(200);
      });

      it('should return 404 Not Found', async () => {
         const response = await api.get('/api/v1/recipes/100g');
         expect(response.status).toBe(404);
      });
    })
});
