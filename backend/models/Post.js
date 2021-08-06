module.exports = (sequelize, DataTypes) => {
  
  return Post = sequelize.define('Post', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    users_like: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })
};