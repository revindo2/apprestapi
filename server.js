const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse aplication
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// panggil routes
var routes = require('./routes');
routes(app);

app.listen(3000, () => {
    console.log('Server started on port');
});