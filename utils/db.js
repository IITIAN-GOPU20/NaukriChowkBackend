const chalk = require('chalk');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const keys = require('../config/keys');
const { database, app } = keys;

const setupDB = async () => {
    try {
        // Connect to MongoDB
        mongoose.set('useCreateIndex', true);
        mongoose
            .connect(database.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
            .then(() =>
                console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`)
            )
            .catch(err => console.log(err));
    } catch (error) {
        return null;
    }
};

module.exports = setupDB;