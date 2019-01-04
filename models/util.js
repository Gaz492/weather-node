/**
 * Created by Gareth on 14/09/2017.
 */
'use strict';
const request = require('request');
const config = require('../config');

module.exports = {
    getForecast: function(callback){
        let url = `https://api.darksky.net/forecast/${config.dark_sky.apikey}/${config.dark_sky.latitude},${config.dark_sky.longitude}?units=${config.dark_sky.units}&exclude=${config.dark_sky.exclude}`;
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