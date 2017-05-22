angular.module('apiCallControllers', [])

.controller('apiCtrl', function($http, $scope) {
    $http.get('http://bg-exchanges.rhcloud.com/rest/').
        then(function(response) {
            // $scope.currencies = angular.toJson(response.data);
            $scope.currencies = response.data;
            console.log($scope.currencies);
        });

    // $scope.getAll = function() {
    //     $http.get('http://bg-exchanges.rhcloud.com/rest/').then(function(response) {
    //         $scope.currencies = response.data;
    //         console.log($scope.currencies);
    //     })
    // }

    //loading json data from a url angularjs

    // $scope.getAll();
    
});