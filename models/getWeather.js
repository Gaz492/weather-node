/**
 * Created by Gareth on 15/09/2017.
 */
const sequelize = require('sequelize');
const models = require('./db');
const WeatherTemp = models.weatherTemp;
const WeatherOther = models.weatherOther;

const options = {
    last24hrs: {
        where: {
            date: {
                $gt: models.sequelize.fn(
                    'DATE_SUB',
                    models.sequelize.literal('NOW()'),
                    models.sequelize.literal('INTERVAL 24 HOUR')
                )
            }
        }
    },
    orderDESC: {
        order: [['date', 'DESC']]
    }
};

function minMax(callback) {
    WeatherTemp.min('temp').then((tempMin) => {
        WeatherTemp.max('temp').then((tempMax) => {
            WeatherTemp.min('humid').then((humidMin) => {
                WeatherTemp.max('humid').then((humidMax) => {
                    callback({tempMin: tempMin, tempMax: tempMax, humidMin: humidMin, humidMax: humidMax});
                });
            });
        });
    });
}

function minMax24(callback) {
    WeatherTemp.min('temp', options.last24hrs).then((tempMin) => {
        WeatherTemp.max('temp', options.last24hrs).then((tempMax) => {
            WeatherTemp.min('humid', options.last24hrs).then((humidMin) => {
                WeatherTemp.max('humid', options.last24hrs).then((humidMax) => {
                    callback({tempMin: tempMin, tempMax: tempMax, humidMin: humidMin, humidMax: humidMax});
                });
            });
        });
    });
}

function latestTempHumid(callback) {
    WeatherTemp.findOne({
        order: [['date', 'DESC']]
    }).then((data) => {
        callback(data);
        return null;
    }).catch((err) => {
        console.log(err);
    });
}
function latestPressureForecast(callback) {
    WeatherOther.findOne({
        order: [['date', 'DESC']]
    }).then((data) => {
        callback(data);
        return null;
    }).catch((err) => {
        console.log(err);
    });
}

function temp24Hours(callback) {
    models.sequelize.query("SELECT DATE_FORMAT(`date`,'%Y-%m-%d %H:00:00') AS time, ROUND(AVG(temp),1) AS avgtemp, ROUND(AVG(humid),1) as avghumid FROM cust_weatherTemp WHERE date > DATE_SUB(NOW(), INTERVAL 24 HOUR) GROUP BY DATE_FORMAT(`date`,'%Y-%m-%d %H:00:00') - INTERVAL 24 HOUR ORDER BY DATE_FORMAT(`date`,'%Y-%m-%d %H:00:00') - INTERVAL 24 HOUR ASC", {model: WeatherTemp})
        .then((data) => {
            callback(data)
        }).catch((err) => {
        console.log(err)
    });
}

function tempWeekHr(callback) {
    models.sequelize.query("SELECT DATE_FORMAT(`date`,'%Y-%m-%d %H:00:00') AS time, ROUND(AVG(temp),1) AS avgtemp, ROUND(AVG(humid),1) as avghumid FROM cust_weatherTemp WHERE date > DATE_SUB(NOW(), INTERVAL 1 WEEK) GROUP BY DATE_FORMAT(`date`,'%Y-%m-%d %H:00:00') - INTERVAL 1 HOUR ORDER BY DATE_FORMAT(`date`,'%Y-%m-%d %H:00:00') - INTERVAL 1 WEEK ASC", {model: WeatherTemp})
        .then((data) => {
            callback(data)
        }).catch((err) => {
        console.log(err)
    });
}

function tempWeek(callback) {
    models.sequelize.query("SELECT DATE_FORMAT(`date`, '%Y-%m-%d') AS day, ROUND(AVG(temp),1) AS avgtemp, ROUND(AVG(humid),1) as avghumid FROM cust_weatherTemp WHERE date > DATE_SUB(NOW(), INTERVAL 7 DAY) GROUP BY DAY(`date`) ORDER BY DATE_FORMAT(`date`, '%Y-%m-%d') ASC", {model: WeatherTemp})
        .then((data) => {
            callback(data)
        }).catch((err) => {
        console.log(err)
    });
}

function tempYear(callback) {
    models.sequelize.query("SELECT DATE_FORMAT(`date`, '%Y-%m-%d') AS month, ROUND(AVG(temp),1) AS avgtemp, ROUND(AVG(humid),1) as avghumid FROM cust_weatherTemp WHERE date > DATE_SUB(NOW(), INTERVAL 1 Year) GROUP BY MONTH(`date`) ORDER BY MONTH(`date`) ASC LIMIT 12", {model: WeatherTemp})
        .then((data) => {
            callback(data)
        }).catch((err) => {
        console.log(err)
    });
}


module.exports = {
    getWeatherData: function (callback) {
        latestTempHumid(function (tempHumidData) {
            latestPressureForecast(function (pressureForecastData) {
                minMax(function (MinMaxData) {
                    minMax24(function (MinMax24Data) {
                        callback({
                            currentTemp: tempHumidData.dataValues.temp,
                            currentHumidity: tempHumidData.dataValues.humid,
                            currentPressure: pressureForecastData.dataValues.baro,
                            currentForecast: pressureForecastData.dataValues.forecast,
                            minMax: MinMaxData,
                            minMax24: MinMax24Data
                        });
                    });
                });
            });
        });
    },

    getGraphData: function (callback) {
        temp24Hours(function (temp24hr) {
            tempWeekHr(function (temp7DayHr) {
                tempWeek(function (temp7Day) {
                    tempYear(function (tempYr) {
                        callback({
                            temp24hr: temp24hr,
                            temp7DayHr: temp7DayHr,
                            temp7Day: temp7Day,
                            tempYear: tempYr
                        });
                    });
                });
            });
        });
    }
};