/**
 * Created by Gareth on 14/09/2017.
 */

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.hostname,
    port: config.db.port,
    dialect: config.db.dialect,
    logging: false,

    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
});

fs
    .readdirSync(__dirname + "/db")
    .filter((file) => {
        const modelFilter = /^[a-zA-Z0-9_-]+\.js$/;
        return (modelFilter.test(file) && file.indexOf('.') !== 0) && (file !== path.basename(module.filename));
    })
    .forEach((file) => {
        console.log("Loaded file: " + file);
        const model = sequelize.import(path.join(__dirname  + "/db", file));
        module.exports[model.name] = model;
    });

module.exports.sequelize = sequelize;