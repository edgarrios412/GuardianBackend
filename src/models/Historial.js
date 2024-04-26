const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('historial', {
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
    observacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },{timestamps:false});
};