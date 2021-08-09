module.exports = (sequelize, DataTypes) => {
  
  return Opinion = sequelize.define('Opinion', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }, 
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    }, 
    postId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Posts',
        key: 'id'
      }
    }
  })
};