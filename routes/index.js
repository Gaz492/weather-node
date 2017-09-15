'use strict';
const express = require('express');
const router = express.Router();

const getWeather = require('../models/getWeather');
const util = require('../models/util');

/* GET home page. */
router.get('/', function (req, res, next) {
    util.getForecast(function (response) {
        let yahooChannel = response.query.results.channel;
        getWeather.getLatestTempHumid(function (getTempHumidData) {
            let currentTemp = getTempHumidData.dataValues.temp;
            let currentHumid = getTempHumidData.dataValues.humid;
            getWeather.getLatestBaroForecast(function (getPressureForecastData) {
                let currentForecast = getPressureForecastData.dataValues.forecast;
                let currentPressure = getPressureForecastData.dataValues.baro;
                getWeather.getMinMax(function (getMinMax) {
                    res.render('index', {
                        data: {
                            error: false,
                            currentTemp: currentTemp,
                            currentHumid: currentHumid,
                            currentForecast: currentForecast,
                            currentPressure: currentPressure,
                            forecast: JSON.stringify(yahooChannel.item.forecast),
                            wind: yahooChannel.wind.speed,
                            minTemp: getMinMax.tempMin,
                            maxTemp: getMinMax.tempMax,
                            minHumid: getMinMax.humidMin,
                            maxHumid: getMinMax.humidMax
                        },
                        dev: process.env.BROWSER_REFRESH_PORT,
                        title: 'Home Weather'
                    });
                });
            });
        });
    });
});

module.exports = router;
