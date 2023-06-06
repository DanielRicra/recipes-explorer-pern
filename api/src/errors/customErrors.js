import { HTTP_STATUS } from '../utils/constants.js';

export class HTTPError extends Error {
   constructor(message, statusCode) {
      super(message);
      this.status = statusCode;
   }
}

export class BadRequestError extends HTTPError {
   constructor(message) {
      super(message, HTTP_STATUS.BAD_REQUEST);
   }
}

export class NotFoundError extends HTTPError {
   constructor(message) {
      super(message, HTTP_STATUS.NOT_FOUND);
   }
}

export class UnauthorizedError extends HTTPError {
   constructor(message) {
      super(message, HTTP_STATUS.UNAUTHORIZED);
   }
}
