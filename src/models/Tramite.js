const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('tramite', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    fechaCreacion:{
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => new Date()
    },
    usuarioAsignado:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    documento:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    fechaActualizacion:{
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => new Date()
    },
    tramite:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    numeroRadicado:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:2024000000
    },
    descripcion:{
      type: DataTypes.STRING,
      allowNull: true
    },
    observaciones:{
      type: DataTypes.STRING,
      allowNull: true
    },
    estado:{
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue:1
    },
    grupoGestion:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    activo:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue:true
    },
  },{timestamps:false});
};