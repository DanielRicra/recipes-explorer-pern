import app from './app.js';
import db from './db.js';

const PORT = 3001;

db.sequelize.sync({ force: true }).then(() => {
   console.log('Synced db. OK');
   
   app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
   });
})
.catch((err) => {
   console.log('Failed to sync db: ' + err.message);
});