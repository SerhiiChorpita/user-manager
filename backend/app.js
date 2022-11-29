const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');

const port = 3000;
const bodyParser = require('body-parser');
const routes = require('./src/app/routes/routes')
const app = express();

require('dotenv').config();

require('./config/database');

require('./models/user');

require('./config/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(passport.initialize());

app.use(express.json());

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
    next();
})
routes(app);

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error:${error}`);

    console.log(`Server listening on port: ${server.address().port}`);
})