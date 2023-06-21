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
         validate: {
            notNull: {
               msg: 'Please enter your name',
            },
         },
      },
      image: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      summary: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      healthScore: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
            min: {
               args: [0],
               msg: 'Health score must be between 0 and 100',
            },
            max: {
               args: [100],
               msg: 'Health score must be between 0 and 100',
            },
         },
      },
      readyInMinutes: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      servings: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
   });
};

export default defineRecipe;
