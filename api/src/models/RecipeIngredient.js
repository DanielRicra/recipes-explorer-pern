const defineRecipeIngredient = (sequelize, DataTypes) => {
   return sequelize.define('recipe_ingredient', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      amount: {
         type: DataTypes.DECIMAL(6, 3),
         allowNull: false,
      },
      unit: { 
         type: DataTypes.STRING,
         allowNull: false,
      }
   }, {
      freezeTableName: true,
   });
};

export default defineRecipeIngredient;
