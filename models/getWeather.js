/**
 * Created by Gareth on 15/09/2017.
 */
const models = require('./db');
const WeatherTemp = models.weatherTemp;
const WeatherOther = models.weatherOther;

module.exports = {
    getLatestTempHumid: function (callback){
        WeatherTemp.findOne({
            order:[['date', 'DESC']]
        }).then((data) => {
            callback(data)
        }).catch((err) => {
            console.log(err);
        })
    },
    getLatestBaroForecast: function (callback){
        WeatherOther.findOne({
            order:[['date', 'DESC']]
        }).then((data) => {
            callback(data)
        }).catch((err) => {
            console.log(err);
        })
    }
};