import db from '../src/db.js';

const Recipe = db.Recipe;
const Diet = db.Diet;

describe('Recipe model', () => {
   beforeAll(() =>
      db.sequelize.authenticate().catch((err) => {
         console.error('Unable to connect to the database:', err);
      })
   );

   describe('Recipe Model', () => {
      beforeEach(() => Recipe.sync({ force: true }));
      const recipeData = {
         name: 'Milanesa a la napolitana',
         image: 'milanesa-a-la-napolitana-1024x683.jpg',
         healthScore: 12,
         summary: 'Summary',
         readyInMinutes: 45,
         servings: 6,
      };

      describe('Valid properties', () => {
         test('should throw an error if name is null', () => {
            expect.assertions(1);
            return Recipe.create({ name: null }).catch((err) => {
               expect(err.message).toMatch(
                  /notNull Violation: Please enter your name/
               );
            });
         });

         test('Should throw an error if healthScore is out of range of 0-100', () => {
            expect.assertions(1);
            return Recipe.create({ healthScore: -1 }).catch((err) => {
               expect(err.message).toMatch(
                  /Health score must be between 0 and 100/
               );
            });
         });

         test('should work when have a valid properties ', async () => {
            const newRecipe = await Recipe.create({
               name: 'Milanesa a la napolitana',
               image: 'milanesa-a-la-napolitana-1024x683.jpg',
               healthScore: 12,
               summary: 'Summary',
               readyInMinutes: 45,
               servings: 6,
            });
            expect(newRecipe).toBeInstanceOf(Recipe);
         });

         test('should throw an error if image is null', () => {
            expect(Recipe.create({ image: null })).rejects.toThrow();
         });
      });
   });
});
