const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000; 

// use path to normalize
const publicPath = path.join(__dirname, '../public');

app.use( express.static(publicPath) );

app.get('/', (req, res) => {
    res.render('index.html');
});

module.exports = { app };

app.listen(port, () => {
    console.log(`started app on port ${port}...`);
});