angular.module('categoryControllers', [])

.controller('categoryCtrl', function($http, $scope) {
     $http.get('/api/categories').then(function (res){
            $scope.categories = res.data;
        })
    var app = this;
    app.addCategory = function(addData) {
        $http.post('/api/categories', this.addData).then(function(res) {
        $http.get('/api/categories').then(function (res){
            $scope.categories = res.data;
            })
        });
    }

    // $scope.deleteAccount = function($event) {
    //         var accountId = $($event.currentTarget).parent().parent().attr('data-account-id');
    //         $http.put('/api/accounts/' + accountId);
    //         $($event.currentTarget).parent().parent().remove();
    //     }
})