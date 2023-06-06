import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { dietRouters, recipeRoutes } from './routes/index.js';
import { cors, errorHandler } from './middlewares/index.js';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('dev'));
app.use(cors);

app.get('/', (_req, res) => {
   res.send('<h2>Welcome to the recipe API</h2>');
});

app.use('/api/v1/recipes', recipeRoutes);
app.use('/api/v1/diets', dietRouters);

app.use(errorHandler);

export default app;