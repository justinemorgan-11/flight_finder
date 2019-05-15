const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

// Define routes:
app.get('/', (req, res, next) => {
    console.log('hey')
    res.send('hey');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
