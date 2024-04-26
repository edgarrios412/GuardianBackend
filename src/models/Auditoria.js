const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('auditoria', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    accion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },{timestamps:false});
};