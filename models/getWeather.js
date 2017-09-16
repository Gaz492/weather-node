/**
 * Created by Gareth on 15/09/2017.
 */
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

function MinMax(callback) {
    WeatherTemp.min('temp').then(tempMin => {
        WeatherTemp.max('temp').then(tempMax => {
            WeatherTemp.min('humid').then(humidMin => {
                WeatherTemp.max('humid').then(humidMax => {
                    callback({tempMin: tempMin, tempMax: tempMax, humidMin: humidMin, humidMax: humidMax});
                })
            })
        })
    });
}

function MinMax24(callback) {
    WeatherTemp.min('temp', options.last24hrs).then(tempMin => {
        WeatherTemp.max('temp', options.last24hrs).then(tempMax => {
            WeatherTemp.min('humid', options.last24hrs).then(humidMin => {
                WeatherTemp.max('humid', options.last24hrs).then(humidMax => {
                    callback({tempMin: tempMin, tempMax: tempMax, humidMin: humidMin, humidMax: humidMax});
                })
            })
        })
    });
}

function LatestTempHumid(callback) {
    WeatherTemp.findOne({
        order: [['date', 'DESC']]
    }).then((data) => {
        callback(data);
        return null;
    }).catch((err) => {
        console.log(err);
    })
}
function LatestPressureForecast(callback) {
    WeatherOther.findOne({
        order: [['date', 'DESC']]
    }).then((data) => {
        callback(data);
        return null;
    }).catch((err) => {
        console.log(err);
    })
}


module.exports = {
    getWeatherData: function (callback) {
        LatestTempHumid(function (tempHumidData) {
            LatestPressureForecast(function (pressureForecastData) {
                MinMax(function (MinMaxData) {
                    MinMax24(function (MinMax24Data) {
                        callback({
                            currentTemp: tempHumidData.dataValues.temp,
                            currentHumidity: tempHumidData.dataValues.humid,
                            currentPressure: pressureForecastData.dataValues.baro,
                            currentForecast: pressureForecastData.dataValues.forecast,
                            minMax: MinMaxData,
                            minMax24: MinMax24Data
                        })
                    })
                })
            })
        });
    }
};