const db = require('../db');
const Airport = require('./Airport');
const Flight = require('./Flight');
const Program = require('./Program');
const Wallet = require('./Wallet');

Program.hasMany(Flight);
Flight.belongsTo(Program);

Wallet.belongsTo(Program);
Program.hasMany(Wallet);

module.exports = {
    Airport,
    Flight,
    Program,
    Wallet,
    db,
};
