import { HTTPError } from '../errors/customErrors.js';
import { HTTP_STATUS } from '../utils/constants.js';

const errorHandler = (err, _req, res, _next) => {
   if (err instanceof HTTPError) {
      res.status(err.status).json({ error: err.message });
   } else {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
   }
};

export default errorHandler;
