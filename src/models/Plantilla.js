const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('plantilla', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },{timestamps:false});
};