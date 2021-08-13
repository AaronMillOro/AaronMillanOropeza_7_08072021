module.exports = (sequelize, DataTypes) => {
  
  return Post = sequelize.define('Post', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    usersLike: {
      type: DataTypes.STRING,
      allowNull: true
    }, 
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  })
};