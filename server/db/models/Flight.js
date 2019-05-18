
const db = require('../db');

const Flight = db.define('flight', {
    origin: {
        type: db.Sequelize.STRING,
    },
    destination: {
        type: db.Sequelize.STRING,
    },
    carrier: {
        type: db.Sequelize.STRING,
    },
    class: {
        type: db.Sequelize.STRING,
    },
    points: {
        type: db.Sequelize.INTEGER,
    }
});

module.exports = Flight;
