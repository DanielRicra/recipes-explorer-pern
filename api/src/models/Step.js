const defineStep = (sequelize, DataTypes) => {
   return sequelize.define('step', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      number: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      length: DataTypes.STRING,
      step: {
         type: DataTypes.TEXT,
         allowNull: false,
      }
   });
};

export default defineStep;