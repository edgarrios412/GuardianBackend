const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('usuario', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rol: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    grupoGestion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    createdDate:{
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => new Date()
    },
    ban:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:false
    }
  },{timestamps:false});
};