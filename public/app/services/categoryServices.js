angular.module('categoryServices',[])

.factory('Category', function($http) {
    var categoryFactory = {};



    categoryFactory.create = function(addData) {
        return $http.post('api/categories', addData);
    }
    return categoryFactory;
});