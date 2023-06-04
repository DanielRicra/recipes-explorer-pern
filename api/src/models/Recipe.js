const defineRecipe = (sequelize, DataTypes) => {
   return sequelize.define('recipe', {
      id: {
         type: DataTypes.UUID,
         primaryKey: true,
         defaultValue: DataTypes.UUIDV4,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      image: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      summary: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      healthScore: {
         type: DataTypes.INTEGER,
         allowNull: false,
      }
   });
};

export default defineRecipe;
