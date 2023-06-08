const defineAnalyzedInstruction = (sequelize, DataTypes) => {
   return sequelize.define('analyzed_instruction', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   });
}; 

export default defineAnalyzedInstruction;