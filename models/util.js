/**
 * Created by Gareth on 14/09/2017.
 */
'use strict';
const request = require('request');

module.exports = {
    getForecast: function(callback){
        let url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text=%22llanrwst,%20uk%22)and%20u%20=%20%27c%27&format=json&env=store://datatables.org/alltableswithkeys";
        request({
            url: url,
            json: true
        }, function (error, response, data) {
            if (!error && response.statusCode === 200) {
                callback(data);
            } else {
                callback(error)
            }
        })
    }
};