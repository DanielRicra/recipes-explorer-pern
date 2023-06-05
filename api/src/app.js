import express from 'express';
import morgan from 'morgan';
import { recipeRoutes } from './routes/index.js';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('dev'));
app.use((_req, res, next) => {
   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
   res.header('Access-Control-Allow-Credentials', 'true');
   res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
   );
   res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, DELETE'
   );
   next();
});

app.get('/', (_req, res) => {
   res.send('<h2>Welcome to the recipe API</h2>');
});

app.use('/api/v1/recipes', recipeRoutes);

app.use((err, _req, res, _next) => {
   const status = err.status || 500;
   const message = err.message || err;
   console.error(err);
   res.status(status).send(message);
});

export default app;