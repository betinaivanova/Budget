angular.module('accountControllers', [])

.controller('accountCtrl', function($http, $scope) {
     $http.get('/api/accounts').then(function (res){
            $scope.accounts = res.data;
        })
    var app = this;
    app.addAccount = function(addData) {
        $http.post('/api/accounts', this.addData).then(function(res) {
        $http.get('/api/accounts').then(function (res){
            $scope.accounts = res.data;
            })
        });
    }

    app.deleteAcc = function() {
        
    }
    $scope.deleteAccount = function($event) {
            var accountId = $($event.currentTarget).parent().parent().attr('data-account-id');
            $http.put('/api/accounts/' + accountId);
            $($event.currentTarget).parent().parent().remove();
        }
})
