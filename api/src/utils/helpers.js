export function createDiets(Diet) {
   Diet.bulkCreate([
      { name: 'Lacto-Vegetarian' },
      { name: 'Weight Watchers' },
      { name: 'Ovo-Vegetarian' },
      { name: 'Mediterranean' },
      { name: 'Clean Eating' },
      { name: 'Gluten-Free' },
      { name: 'Pescetarian' },
      { name: 'Grain-Free' },
      { name: 'Low FODMAP' },
      { name: 'Vegetarian' },
      { name: 'Fruitarian' },
      { name: 'The Paleo' },
      { name: 'Ketogenic' },
      { name: 'Omnivore' },
      { name: 'Whole30' },
      { name: 'Primal' },
      { name: 'Vegan' },
      { name: 'Paleo' },
      { name: 'GAPS' },
   ])
      .then(() => {
         console.log('Created diets. OK');
      })
      .catch((err) => {
         console.log('Failed to create diets: ' + err.message);
      });
}
