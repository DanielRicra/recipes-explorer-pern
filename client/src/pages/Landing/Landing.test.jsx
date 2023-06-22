import { expect, describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Landing from './Landing';

describe('Landing page', () => {
   test('should render the landing page', () => {
      render(
         <MemoryRouter>
            <Landing />
         </MemoryRouter>
      );

      expect(
         screen.getByText('Let\'s cook with the most delicious recipes')
      ).toBeDefined();
      expect(screen.getByText('Start searching')).toBeDefined();
      expect(screen.getByText('Start searching').tagName).toBe('BUTTON');
      expect(screen.getByTitle('Food landing image')).toBeDefined();
   });
});
