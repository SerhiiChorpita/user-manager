const express = require('express');
const port = 3002;
const bodyParser = require('body-parser');
const routes = require('./app/routes/routes')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
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