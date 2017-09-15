/**
 * Created by Gareth on 14/09/2017.
 */
'use strict';
const express = require('express');
const router = express.Router();
const config = require('../config');
const models = require('../models/db');

const WeatherOther = models.weatherTemp;

/*function test(callback) {
    WeatherOther.findAll({
    }).then((data) => {
        callback(data)
    }).catch((err) => {
        console.log(err);
        callback("NaN")
    })
}

function test2() {
    WeatherOther.create({
        temp: 99.9
    }).complete(function (err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
        }
    })
}*/

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
                res.send("Barometer or forecast")
            } else if (typeof temperature !== 'undefined') {
                res.send("temperature or humidity")
            }
            else {
                res.header("Content-Type", "application/json");
                res.status(400).json({code: 400, response: "Error: Bad Request"})
            }
        }
        else {
            res.header("Content-Type", "application/json");
            res.status(401).json({code: 401, response: "Error: Unauthorized Request", data: JSON.stringify(postData)})
        }
    }
    else {
        res.header("Content-Type", "application/json");
        res.status(401).json({code: 401, response: "Error: Unauthorized Request", data: JSON.stringify(postData)})
    }
});

module.exports = router;
