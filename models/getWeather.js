/**
 * Created by Gareth on 15/09/2017.
 */
const models = require('./db');
const WeatherTemp = models.weatherTemp;
const WeatherOther = models.weatherOther;

const last24hrs = {
    where:{
        date: {
            $gt: models.sequelize.fn(
                'DATE_SUB',
                models.sequelize.literal('NOW()'),
                models.sequelize.literal('INTERVAL 24 HOUR')
            )
        }
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
    WeatherTemp.min('temp', last24hrs).then(tempMin => {
        WeatherTemp.max('temp', last24hrs).then(tempMax => {
            WeatherTemp.min('humid', last24hrs).then(humidMin => {
                WeatherTemp.max('humid', last24hrs).then(humidMax => {
                    callback({tempMin: tempMin, tempMax: tempMax, humidMin: humidMin, humidMax: humidMax});
                })
            })
        })
    });
}


module.exports = {
    getLatestTempHumid: function (callback){
        WeatherTemp.findOne({
            order:[['date', 'DESC']]
        }).then((data) => {
            callback(data);
            return null;
        }).catch((err) => {
            console.log(err);
            callback(err)
        })
    },
    getLatestBaroForecast: function (callback){
        WeatherOther.findOne({
            order:[['date', 'DESC']]
        }).then((data) => {
            callback(data);
            return null;
        }).catch((err) => {
            console.log(err);
        })
    },
    getMinMax: function (callback) {
        MinMax(function (data) {
            callback(data);
        });
    },
    getMinMax24: function (callback) {
        MinMax24(function (data) {
            callback(data);
        });
    }
};