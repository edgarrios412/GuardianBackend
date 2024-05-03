const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('reporte', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    detalle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coordenadas: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue:() => new Date()
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },{timestamps:false});
};