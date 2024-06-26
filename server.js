const app = require("./app")
const express = require('express');
const chalk = require('chalk');
const dotenv = require('dotenv');
dotenv.config()
const keys = require("./config/keys");
const cors = require('cors');
const helmet = require('helmet');

const routes = require('./routes');
const setupDB = require('./utils/db');
const { port } = keys;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    helmet({
        contentSecurityPolicy: false,
        frameguard: true
    })
);
app.use(cors());

setupDB();
require('./config/passport')(app);



app.use(routes);
const server = app.listen(port, () => {
    console.log(
        `${chalk.green('✓')} ${chalk.blue(
            `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
        )}`
    );
});

