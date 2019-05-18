const db = require('../db');

const Program = db.define('program', {
    name: {
        type: db.Sequelize.STRING,
    },
    company: {
        type: db.Sequelize.STRING,
    },
    image: {
        type: db.Sequelize.STRING,
    }
});

module.exports = Program;
