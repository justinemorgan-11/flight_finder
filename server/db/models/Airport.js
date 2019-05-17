
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
    iataCode: {
        type: db.Sequelize.STRING,
    },
    latitude: {
        type: db.Sequelize.NUMBER,
    },
    longitude: {
        type: db.Sequelize.NUMBER,
    },
});


module.exports = Airport;
