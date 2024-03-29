const { Model, DataTypes  } = require('sequelize');
const sequelize = require('./db');

class users extends Model {}

users.init({
  username: {
    type: DataTypes.STRING
  },
  gender: {
    type: DataTypes.STRING
  },
  dob: {
    type: DataTypes.DATE
  },
  contctnum: {
    type: DataTypes.NUMBER
  },
  email: {
    type: DataTypes.STRING
  },
  pass: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  state: {
    type: DataTypes.STRING
  },
  zipcode: {
    type: DataTypes.NUMBER
  },
},
{
  sequelize,
  modelName: 'user'
})


module.exports = users;
