const express = require('express');
const path = require('path');
const unirest = require('unirest');

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

// Define routes:
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

// Search for flights
app.post('/flights', (req, res, next) => {
    console.log(req.body);
    unirest.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/${req.body.origin}-sky/${req.body.destination}-sky/${req.body.dateOut}?inboundpartialdate=${req.body.dateIn}`)
        .header('X-RapidAPI-Host', 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com')
        .header('X-RapidAPI-Key', 'a3651dcd2bmsh32563a5601b483cp1e8fabjsnca9aa8fede2e')
        .end(function (result) {
            res.send(result);
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
