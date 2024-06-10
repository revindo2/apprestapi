const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var morgan = require('morgan');

// parse aplication
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// panggil routes
var routes = require('./routes');
routes(app);

// daftarkan menu routes dari index
// const { use } = require('./middleware');
app.use('/auth', require('./middleware'));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});