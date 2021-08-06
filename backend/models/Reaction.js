module.exports = (sequelize, DataTypes) => {
  
  return Reaction = sequelize.define('Reaction', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  })
};