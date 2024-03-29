const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test-db', 'user', 'pass', {
    dialect: 'sqlite',
    host: './pathology.sqlite'
})
sequelize.sync().then(() => console.log('db set'))

module.exports = sequelize