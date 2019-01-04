'use strict';
const express = require('express');
const router = express.Router();
const moment = require('moment');

const getWeather = require('../models/getWeather');
const util = require('../models/util');

/* GET home page. */
router.get('/', function (req, res, next) {
    util.getForecast(function (response) {
        let dark_sky = response;
        getWeather.getWeatherData(function(weatherData){
            res.render('index', {
                data: {
                    error: false,
                    currentTemp: weatherData.tempHumidData.dataValues.temp,
                    currentHumid: weatherData.tempHumidData.dataValues.humid,
                    currentForecast: weatherData.pressureForecastData.dataValues.forecast,
                    currentPressure: weatherData.pressureForecastData.dataValues.baro,
                    forecast: dark_sky.daily,
                    wind: dark_sky.currently.windSpeed,
                    minTemp: weatherData.minMaxData.tempMin,
                    maxTemp: weatherData.minMaxData.tempMax,
                    minHumid: weatherData.minMaxData.humidMin,
                    maxHumid: weatherData.minMaxData.humidMax,
                    minTemp24: weatherData.minMax24Data.tempMin,
                    maxTemp24: weatherData.minMax24Data.tempMax,
                    minHumid24: weatherData.minMax24Data.humidMin,
                    maxHumid24: weatherData.minMax24Data.humidMax,
                    // Graphs
                    dayHour: weatherData.temp24hr,
                    weekHr: weatherData.temp7DayHr,
                    week: weatherData.temp7Day,
                    year: weatherData.tempYr,
                },
                title: 'Home Weather',
                time: moment().format("dddd MMM Do YYYY ")
            });
        });
    });
});

module.exports = router;
