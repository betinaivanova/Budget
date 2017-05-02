angular.module('accountServices',[])

.factory('Account', function($http) {
    var accountFactory = {};



    accountFactory.create = function(addData) {
        return $http.post('api/accounts', addData);
    }
    return accountFactory;
});