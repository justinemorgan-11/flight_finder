const db = require('../db');

const Wallet = db.define('wallet', {
    quantity: {
        type: db.Sequelize.INTEGER,
    },
    valuation: {
        type: db.Sequelize.FLOAT,
    },
    programName: {
        type: db.Sequelize.STRING,
    },
});

module.exports = Wallet;
