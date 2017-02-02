angular.module('myApp').controller('mainController',['$scope','$log',function($scope,$log){
    $scope.switchTab = function(tab){
//        debugger;
        if(tab !== "d3"){
            $("svg").hide();
            $log.info("svg is hide");
        }
        else{
            $("svg").show();
            $log.info("svg is show");
        }
    }
}])