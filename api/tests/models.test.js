import db from '../src/db.js';

const Recipe = db.Recipe;

describe('Recipe model', () => {
   beforeAll(() =>
      db.sequelize.authenticate().catch((err) => {
         console.error('Unable to connect to the database:', err);
      })
   );

   describe('Validators', () => {
      beforeEach(() => Recipe.sync({ force: true }));

      describe('name', () => {
         it('should throw an error if name is null', (done) => {
            Recipe.create({})
               .then(() => done(new Error('It requires a valid name')))
               .catch(() => done());
         });

         it('should work when its a valid name', () => {
            Recipe.create({
               name: 'Milanesa a la napolitana',
               image: 'milanesa-a-la-napolitana-1024x683.jpg',
               healthScore: 12,
               summary: 'Summary',
               readyInMinutes: 45,
               servings: 6,
            });
         });
      });
   });
});
