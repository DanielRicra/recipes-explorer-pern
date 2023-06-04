'use strict';
import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';
import defineRecipe from './models/Recipe.js';
import defineDiet from './models/Diet.js';

dotenv.config();

const db = {};

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
   {
      logging: false,
      native: false,
      define: { timestamps: false }
   }
);


db.Recipe = defineRecipe(sequelize, DataTypes); 
db.Diet = defineDiet(sequelize, DataTypes);

db.sequelize = sequelize;

export default db;
