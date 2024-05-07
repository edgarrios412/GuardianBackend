const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('listatramites', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },{timestamps:false});
};