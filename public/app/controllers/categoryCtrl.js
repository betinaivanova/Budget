angular.module('categoryControllers', [])

.controller('categoryCtrl', function($http, $scope) {
     $http.get('/api/categories').then(function (res){
            $scope.categories = res.data;
            console.log($scope.categories);
    });

    var app = this;
    app.addCategory = function(addCategoryData) {
        $http.post('/api/categories', this.addCategoryData).then(function(res) {
        $http.get('/api/categories').then(function (res){
            $scope.categories = res.data;
            })
        });
    }

    $scope.deleteCategory = function($event) {
            var categoryId = $($event.currentTarget).parent().parent().attr('data-category-id');
            console.log(categoryId);
            $http.put('/api/categories/' + categoryId);
            $($event.currentTarget).parent().parent().remove();
        }
})