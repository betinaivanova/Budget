angular.module('apiCallControllers', [])

.controller('apiCtrl', function($http, $scope) {
    $http.get('http://bg-exchanges.rhcloud.com/rest/').then(function(res) {
            $scope.currencies = res.data;
            console.log($scope.currencies);
        });
});