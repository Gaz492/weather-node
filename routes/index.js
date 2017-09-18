'use strict';
const express = require('express');
const router = express.Router();

const getWeather = require('../models/getWeather');
const util = require('../models/util');

/* GET home page. */
router.get('/', function (req, res, next) {
    util.getForecast(function (response) {
        let yahooChannel = response.query.results.channel;
        getWeather.getWeatherData(function (weatherData) {
            getWeather.getGraphData(function (graphData){
                res.render('index', {
                    data: {
                        error: false,
                        currentTemp: weatherData.currentTemp,
                        currentHumid: weatherData.currentHumidity,
                        currentForecast: weatherData.currentForecast,
                        currentPressure: weatherData.currentPressure,
                        forecast: JSON.stringify(yahooChannel.item.forecast),
                        wind: yahooChannel.wind.speed,
                        minTemp: weatherData.minMax.tempMin,
                        maxTemp: weatherData.minMax.tempMax,
                        minHumid: weatherData.minMax.humidMin,
                        maxHumid: weatherData.minMax.humidMax,
                        minTemp24: weatherData.minMax24.tempMin,
                        maxTemp24: weatherData.minMax24.tempMax,
                        minHumid24: weatherData.minMax24.humidMin,
                        maxHumid24: weatherData.minMax24.humidMax,
                        // Graphs
                        dayHour: graphData.temp24hr,
                        weekHr: graphData.temp7DayHr,
                        week: graphData.temp7Day,
                        year: graphData.tempYear
                    },
                    dev: process.env.BROWSER_REFRESH_PORT,
                    title: 'Home Weather'
                });
            })
        })
    });
});

module.exports = router;
