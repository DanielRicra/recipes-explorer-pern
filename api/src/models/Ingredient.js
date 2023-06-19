const defineIngredient = (sequelize, DataTypes) => {
   return sequelize.define('ingredient', {
      id: {
         type: DataTypes.UUID,
         primaryKey: true,
         defaultValue: DataTypes.UUIDV4,
      },
      aisle: DataTypes.STRING,
      image: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      consistency: {
         type: DataTypes.ENUM('solid', 'liquid', 'gas'),
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   });
};

export default defineIngredient;