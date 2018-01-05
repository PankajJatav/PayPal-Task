// require('./Controllers/index.js');
// var weatherJs = require('weather-js');
var weatherApp = angular
    .module('weatherForecast',[])
    .controller('weatehrReportController', function($scope, $http){
        $scope.states = [
            {state: 'Sikkim'},
            {state : 'Bangalore'},
            {state : 'Hyderabad'},
            {state : 'Mangalore'},
            {state : 'Siliguri'}
        ];

        $scope.changeForecast = function(event){
            let state = event.state['state'];
            $scope.data = getWeather(state);
        };


        let getWeather = function(state){
            // let key = 'b6907d289e10d714a6e88b30761fae22'
            let resp = '';
            // console.log(state);
            $scope.state = state;
            let url = "https://query.yahooapis.com/v1/public/yql?q=select item from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+state+", in')&format=json"
            $http.get(url).then( function(response) {
                // console.log(response.data);
                let data = response.data.query.results.channel.item.description;
                document.getElementById('data').innerHTML = (data.split('A[')[1]).split(']]>')[0];
                // console.log(data);
             });
        }

        getWeather($scope.states[1]['state']);


        
})