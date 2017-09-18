/**
 * Created by Gareth on 14/09/2017.
 */
'use strict';
const express = require('express');
const router = express.Router();
const config = require('../config');
const models = require('../models/db');

const WeatherTemp = models.weatherTemp;
const WeatherOther = models.weatherOther;

/* GET home page. */
router.post('/', function (req, res, next) {

    let postData = req.body;

    let macAddress = postData.mac,
        barometer = postData.baro,
        forecast = postData.wfor,
        temperature = postData.ot,
        humidity = postData.oh;

    if (typeof macAddress !== 'undefined') {
        if (macAddress === config.weatherApp.macAddress) {
            if (typeof barometer !== 'undefined') {
                WeatherOther.create({
                    baro: barometer,
                    forecast: forecast
                }).then(function (data) {
                    console.log(data);
                    res.send(data);
                })
            } else if (typeof temperature !== 'undefined') {
                WeatherTemp.create({
                    temp: temperature,
                    humid: humidity
                }).then(function (err, data) {
                    console.log(data);
                    res.send(data);
                })
            }
            else {
                res.header("Content-Type", "application/json");
                res.status(400).json({code: 400, response: "Error: Bad Request"})
            }
        }
        else {
            res.header("Content-Type", "application/json");
            res.status(401).json({code: 401, response: "Error: Unauthorized Request", data: JSON.stringify(postData)});
            console.log("Error: " + JSON.stringify(postData))
        }
    }
    else {
        res.header("Content-Type", "application/json");
        res.status(401).json({code: 401, response: "Error: Unauthorized Request", data: JSON.stringify(postData)});
        console.log("Error: " + JSON.stringify(postData))
    }
});

module.exports = router;
