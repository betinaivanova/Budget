angular.module('budgetServices',[])

.factory('Budget', function($http) {
    var budgetFactory = {};



    budgetFactory.createBudget = function(addData) {
        return $http.post('api/details');
    }
    return budgetFactory;
});