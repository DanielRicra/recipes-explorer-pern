import { expect, describe, test } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import recipesData from '../../utils/recipesData.json';
import RecipeCard from './RecipeCard.jsx';

describe('RecipeCard test', () => {
   describe('RecipeCard should have all properties', () => {
      const recipe = recipesData.at(0);
      render(
         <MemoryRouter initialEntries={['/']}>
            <RecipeCard recipe={recipe} />
         </MemoryRouter>
      );

      test('RecipeCard should have recipe title', () => {
         expect(screen.getByText(recipe.title)).toBeDefined();
         expect(screen.getByText(recipe.title).tagName).toBe('H2');
      });

      test('RecipeCard should have recipe health score', () => {
         expect(screen.getByText(recipe.healthScore + '%').textContent).toBe(
            recipe.healthScore.toString() + '%'
         );
      });

      test('RecipeCard should have recipe health score', () => {
         expect(screen.getByTestId('recipe-card-image')).toBeDefined();
         expect(screen.getByTestId('recipe-card-image').tagName).toBe('IMG');
         expect(screen.getByText(recipe.readyInMinutes + 'min')).toBeDefined();
      });

      test('RecipeCard should have recipe Calories in a p tag', () => {
         expect(screen.getByTitle('Calories')).toBeDefined();
         expect(screen.getByTitle('Calories').tagName).toBe('P');
      });

      test('RecipeCard should have recipe diets', () => {
         expect(screen.getByTestId('recipe-card-diets')).toBeDefined();

         const diets = screen.getAllByTestId('recipe-card-diet');
         expect(diets.length).toBe(recipe.diets.length);
         expect(diets[0].textContent).toBe(recipe.diets[0]);
         expect(diets[1].textContent).toBe(recipe.diets[1]);
      });
   });

   test('should render the omnivore text if there are no diets', () => {
      const recipe = { diets: [] };
      const { getByText } = render(
         <MemoryRouter initialEntries={['/']}>
            <RecipeCard recipe={recipe} />
         </MemoryRouter>
      );

      expect(getByText('omnivore')).toBeDefined();
      expect(getByText('omnivore').tagName).toBe('SPAN');

      cleanup();
   });

   test('should render "-- cal" if the there is no calories', () => {
      const recipe = { title: 'no calories' };
      const { getByTitle } = render(
         <MemoryRouter initialEntries={['/']}>
            <RecipeCard recipe={recipe} />
         </MemoryRouter>
      );

      expect(getByTitle('Calories').textContent).match(/-- cal/);
   });
});
