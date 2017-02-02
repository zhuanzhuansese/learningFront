angular.module('myApp').controller('html5Controller',['$scope','$log',function($scope,$log){
    $scope.debug=function(){
        $log.info($scope);
    }
    $scope.drag=function(ev){
        ev.dataTransfer.setData("Text",ev.target.id);
    }
    $scope.drop=function(ev)
    {
        ev.preventDefault();
        var data=ev.dataTransfer.getData("Text");
        ev.target.appendChild(document.getElementById(data));
    }
    $scope.allowDrop=function(ev)
    {
        ev.preventDefault();
    }  
  }])
