const db = require('../db');

const User = db.define('user', {
    firstName: {
        type: db.Sequelize.STRING,
    },
    lastName: {
        type: db.Sequelize.STRING,
    },
    email: {
        type: db.Sequelize.STRING,
    },
    password: {
        type: db.Sequelize.STRING,
    },
});

module.exports = User;
