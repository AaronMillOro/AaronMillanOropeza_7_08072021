'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Opinion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Opinion.belongsTo(models.User, { foreignKey: 'userId' });
      Opinion.belongsTo(models.Post, { foreignKey: 'postId', onDelete: 'cascade' });
      
    }
  };
  Opinion.init({
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Opinion',
  });
  return Opinion;
};