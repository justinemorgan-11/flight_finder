
const db = require('../db');

const Airport = db.define('airport', {

    openFlightsId: {
        type: db.Sequelize.INTEGER,
    },
    airportName: {
        type: db.Sequelize.STRING,
    },
    city: {
        type: db.Sequelize.STRING,
    },
    country: {
        type: db.Sequelize.STRING,
    },
    region: {
        type: db.Sequelize.STRING,
    },
    iataCode: {
        type: db.Sequelize.STRING,
    },
    latitude: {
        type: db.Sequelize.FLOAT,
    },
    longitude: {
        type: db.Sequelize.FLOAT,
    },
});

module.exports = Airport;
