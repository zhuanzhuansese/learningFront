require([
//    'app',
    'route',
    'controllers/main.controller',
    'controllers/HTML5.controller',
    'directives/d3.directive',
//    'directives/ngdrag.directive',    
],function(){
    angular.element(document).ready(function(){
        angular.bootstrap(document,['myApp']);
    });
});

