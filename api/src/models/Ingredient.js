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
         allowNull: true,
      },
      consistency: {
         type: DataTypes.ENUM('solid', 'liquid', 'gas'),
         allowNull: false,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   });
};

export default defineIngredient;