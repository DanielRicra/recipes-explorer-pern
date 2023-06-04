const defineDiet = (sequelize, DataTypes) => {
   return sequelize.define('diet', {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      name: {  
         type: DataTypes.STRING,
         allowNull: false,
         unique: true
      }
   });
};

export default defineDiet;
