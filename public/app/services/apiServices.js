angular.module('apiServices',[])

.factory('Api', function($http) {
    var apiFactory = {};



    apiFactory.get = function(data) {
        return $http.get('http://bg-exchanges.rhcloud.com/rest/', data);
    }
    return apiFactory;
});