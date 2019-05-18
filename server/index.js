const express = require('express');
const path = require('path');
const unirest = require('unirest');
const { syncAndSeed } = require('./db/seed/syncAndSeed');
const { Flight, Program, Wallet, Airport } = require('./db/models/index');

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

// Define routes:
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

// Data from Skyscanner:
app.post('/flights', (req, res, next) => {
    unirest.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/${req.body.origin}-sky/${req.body.destination}-sky/${req.body.dateOut}?inboundpartialdate=${req.body.dateIn}`)
        .header('X-RapidAPI-Host', 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com')
        .header('X-RapidAPI-Key', 'a3651dcd2bmsh32563a5601b483cp1e8fabjsnca9aa8fede2e')
        .end(function (result) {
            res.send(result);
        });
});

// Data from models:
app.get('/awardflights', (req, res, next) => {
    Flight.findAll()
        .then(flights => res.send(flights));
})

app.get('/programs', (req, res, next) => {
    Program.findAll()
        .then(program => res.send(program));
})

app.get('/wallets', (req, res, next) => {
    Wallet.findAll()
        .then(wallet => res.send(wallet));
})

app.get('/wallets/:id', (req, res, next) => {
    Wallet.findOne({
        where: {
            id: req.params.id,
        }
    })
        .then(wallet => res.send(wallet));
})

app.put('/wallets/:id', (req, res, next) => {
    Wallet.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(wallet => wallet.update(req.body))
        .then(wallet => res.send(wallet));
})

app.get('/airports', (req, res, next) => {
    Airport.findAll()
        .then(airports => res.send(airports));
})

syncAndSeed();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
