angular.module('accountControllers', [])

.controller('accountCtrl', function($http, $scope) {
     $http.get('/api/accounts').then(function (res){
            $scope.accounts = res.data;
        })
    var app = this;
    app.addAccount = function(addData) {
        console.log('form submited');
        console.log(this.addData);
        $http.post('/api/accounts', this.addData).then(function(res) {
            console.log(res);
        $http.get('/api/accounts').then(function (res){
            $scope.accounts = res.data;
        })
        });


    }
})
