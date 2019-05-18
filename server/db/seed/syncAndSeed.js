const seedAirports = require('./data/seedAirports');
const seedFlights = require('./data/seedFlights');
const seedPrograms = require('./data/seedPrograms');
const seedWallets = require('./data/seedWallets');
const { db, Airport, Flight, Program, Wallet } = require('../models/index');

const setProgramId = (flights, programs) => {
    return flights.map(flight => {
        const programId = programs.find(p => p.company === flight.carrier).id;
        return flight.update({ programId });
    })
}

const setProgramIdWallet = (wallets, programs) => {
    return wallets.map(wallet => {
        const program = programs.find(p => p.name === wallet.programName);
        const programId = program ? program.id : null;
        return wallet.update({ programId });
    })
}

const syncAndSeed = (force = true) => {
    db.sync({ force })
        .then(() => console.log('Database has been synced'))
        .then(() => {
            return Promise.all([
                Promise.all(seedAirports.map(airport => Airport.create(airport))),
                Promise.all(seedFlights.map(flight => Flight.create(flight))),
                Promise.all(seedPrograms.map(program => Program.create(program))),
                Promise.all(seedWallets.map(wallet => Wallet.create(wallet))),
            ])
        })
        .then(([airports, flights, programs, wallets]) => {
            setProgramId(flights, programs);
            setProgramIdWallet(wallets, programs);
        })
        .then(() => console.log('Database has been seeded'));
};

module.exports = {
    syncAndSeed,
};
