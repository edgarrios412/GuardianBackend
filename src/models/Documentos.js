const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('documentos', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },{timestamps:false});
};