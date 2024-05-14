const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('system', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    limitDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: () => {
        const date = new Date()
        date.setDate(date.getDate()+7)
        return date
      }
    },
    createdDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: () => new Date()
    },
    urlpay: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactMail: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },{timestamps:false});
};