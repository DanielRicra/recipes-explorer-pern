import app from '../src/app.js';
import request from 'supertest';

const api = request(app);

describe('GET /api/v1/diets/', () => {
   it('should return 200 OK', async () => {
      const response = await api.get('/api/v1/diets/');
      expect(response.status).toBe(200);
   });

   it('Should return all diets as an array', async () => {
      const response = await api.get('/api/v1/diets/');
      expect(response.body).toBeInstanceOf(Array);
   });
});
