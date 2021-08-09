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
    job: {
      type: DataTypes.STRING,
      defaultValue: 'Poste de travail'
    }, 
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false, 
      defaultValue: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    timestamps: false
  })
};