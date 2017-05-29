angular.module('categoryServices',[])

.factory('Category', function($http) {
    var categoryFactory = {};


    categoryFactory.create = function(addCategoryData) {
        return $http.post('api/categories', addCategoryData);
    }

    return categoryFactory;
});