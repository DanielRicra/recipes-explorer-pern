import dietService from "../services/dietService.js";
import { HTTP_STATUS } from "../utils/constants.js";

const getAllDiets = async (_req, res, next) => {
   try {
      const results = await dietService.getAllDiets();
      
      res.status(HTTP_STATUS.OK).json(results);
   } catch (error) {
      next(error);
   }
};

export default {
   getAllDiets,
};
