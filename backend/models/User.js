module.exports = (sequelize, DataTypes) => {
  
  return User = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pseudo: {
      type: DataTypes.STRING,
      defaultValue: 'Nouveau utilisateur'
    }, 
      is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false, 
        defaultValue: false
    }
  })
};