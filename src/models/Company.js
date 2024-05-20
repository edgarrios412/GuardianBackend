const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('company', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdDate:{
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => new Date()
    }
  },{timestamps:false});
};