'use strict';
import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';
import {
   defineDiet,
   defineRecipe,
   defineIngredient,
   defineAnalyzedInstruction,
   defineStep,
   defineRecipeIngredient
} from './models/index.js';

dotenv.config();

const db = {};

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
   {
      logging: false,
      native: false,
      define: { timestamps: false },
   }
);

const Recipe = defineRecipe(sequelize, DataTypes);
const Diet = defineDiet(sequelize, DataTypes);
const Ingredient = defineIngredient(sequelize, DataTypes);
const AnalyzedInstruction = defineAnalyzedInstruction(sequelize, DataTypes);
const Step = defineStep(sequelize, DataTypes);
const RecipeIngredient = defineRecipeIngredient(sequelize, DataTypes);

Recipe.belongsToMany(Diet, { through: 'recipe_diet' });
Diet.belongsToMany(Recipe, { through: 'recipe_diet' });

Recipe.belongsToMany(Ingredient, { through: RecipeIngredient });
Ingredient.belongsToMany(Recipe, { through: RecipeIngredient });

Recipe.AnalyzedInstruction = Recipe.hasMany(AnalyzedInstruction, { foreignKey: 'recipeId' });
AnalyzedInstruction.belongsTo(Recipe, { foreignKey: 'recipeId' });

AnalyzedInstruction.Step = AnalyzedInstruction.hasMany(Step, { foreignKey: 'analyzedInstructionId' });
Step.belongsTo(AnalyzedInstruction, { foreignKey: 'analyzedInstructionId' });

db.sequelize = sequelize;
db.Diet = Diet;
db.Ingredient = Ingredient;
db.Recipe = Recipe;
db.RecipeIngredient = RecipeIngredient;
db.Step = Step;
db.AnalyzedInstruction = AnalyzedInstruction;

export default db;
