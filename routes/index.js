'use strict';
const express = require('express');
const router = express.Router();
const moment = require('moment');

const getWeather = require('../models/getWeather');
const util = require('../models/util');

function getForecast(status, size) {
    switch (status) {
        case 0:
            return {icon: "/static/img/weather/" + size + "/partly_cloudy.png", text: "Partly Cloudy"};
        case 1:
            return {icon: "/static/img/weather/" + size + "/sunny.png", text: "Sunny"};
        case 2:
            return {icon: "/static/img/weather/" + size + "/cloudy.png", text: "Cloudy"};
        case 3:
            return {icon: "/static/img/weather/" + size + "/rain.png", text: "Rainy"};
        case 4:
            return {icon: "/static/img/weather/" + size + "/snow.png", text: "Snowy"};
        default:
            return {
                icon: "/static/img/" + size + "/cloudy.png",
                text: "Error getting forecast"
            };
    }
}
function getThumbnail(status, size){
    switch (status.toLowerCase()) {
        case "hot":
            return "/static/img/weather/" + size + "/hot.png";
        case "sunny":
        case "mostly sunny":
            return "/static/img/weather/" + size + "/sunny.png";
        case "thunderstorms":
        case "severe thunderstorms":
            return "/static/img/weather/" + size + "/thunderstorms.png";
        case "scattered thunderstorms":
            return "/static/img/weather/" + size + "/rain_s_cloudy.png";
        case "partly cloudy":
        case "mostly cloudy":
            return "/static/img/weather/" + size + "/partly_cloudy.png";
        case "cloudy":
            return "/static/img/weather/" + size + "/cloudy.png";
        case "showers":
        case "scattered showers":
            return "/static/img/weather/" + size + "/rain_light.png";
        case "rain":
            return "/static/img/weather/" + size + "/rain.png";
        case "snow":
        case "heavy snow":
        case "snow flurries":
        case "blowing snow":
            return "/static/img/weather/" + size + "/snow.png";
        case "sleet":
            return "/static/img/weather/" + size + "/sleet.png";
        case "windy":
            return "/static/img/weather/" + size + "/windy.png";
        default:
            return "/static/img/weather/" + size + "/cloudy.png";
    }
}

/* GET home page. */
router.get('/', function (req, res, next) {
    util.getForecast(function (response) {
        let yahooChannel = response.query.results.channel;
        getWeather.getWeatherData(function (weatherData) {
            getWeather.getGraphData(function (graphData) {
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
                        year: graphData.tempYear,
                    },
                    dev: process.env.BROWSER_REFRESH_PORT,
                    title: 'Home Weather',
                    time: moment().format("dddd MMM Do YYYY "),
                });
            })
        })
    });
});

module.exports = router;
