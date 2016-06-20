var app=angular.module('myApp',['ngRoute']);
app.controller('mainController',['$log',function($log){
    $log.info('mainController is initiated.');
}])
.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
        $routeProvider
          .when('/',{
            templateUrl:'src/views/HTML5.html',
        })
          .when('/d3',{
            templateUrl:'src/views/d3DEMO.html',
            //controller:'mainController',
        })
          .otherwise({redirectTo:'/'})
    }])
