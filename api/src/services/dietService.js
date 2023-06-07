import db from '../db.js';

const Diet = db.Diet;

const getAllDiets = async () => {
   return await Diet.findAll();
};

export default {
   getAllDiets,
}
