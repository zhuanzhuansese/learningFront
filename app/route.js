angular.module('myApp')
.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
        $routeProvider
          .when('/',{
            templateUrl:'src/views/HTML5.html',
            controller:'html5Controller',
        })
          .when('/video',{
            templateUrl:'src/views/video.html',
        })
          .when('/audio',{
            templateUrl:'src/views/audio.html',
        })
          .when('/d3',{
            templateUrl:'src/views/d3DEMO.html',
            //controller:'mainController',
        })
          .otherwise({redirectTo:'/'})
    }])