const defineAnalyzedInstruction = (sequelize, DataTypes) => {
   return sequelize.define('analyzed_instruction', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      name: {
         type: DataTypes.STRING,
      },
   });
}; 

export default defineAnalyzedInstruction;