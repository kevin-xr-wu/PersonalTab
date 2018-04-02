var axios = require('axios'); 

module.exports = {
    fetchWeather: function(location) {
        var encodedURI = window.encodeURI('http://api.apixu.com/v1/forecast.json?key=e37ea880dc214c59a2b12623170409&q=' + 
                            location +'&days=5');
                 
        return axios.get(encodedURI).then(function(response) {
            console.log(response.data); 
            return response.data; 
        })
    }
}