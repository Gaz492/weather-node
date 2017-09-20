/**
 * Created by Gareth on 18/09/2017.
 */
'use strict';
let displayContent = new Vue({
    delimiters: ['%(', '%)'],
    el: "#weather-card",
    data: {
        location: "",
        status: siteData.status,
        time: moment().format("dddd MMM Do YYYY "),
        temperature: siteData.currentTemp,
        humidity: siteData.currentHumidity,
        wind: siteData.windSpeed,
        pressure: siteData.currentPressure,
        forecast: siteData.forecast,
        error: false
    },
    computed: {
        displayDate: function () {
            // Slice time
            return this.time.slice(0, 16);
        }
    },
    methods: {
        getForecast: function (status, size) {
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
        },
        getThumbnail: function (status, size) {
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
    }
});
displayContent();