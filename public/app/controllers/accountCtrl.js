angular.module('accountControllers', [])

.controller('accountCtrl', function($http) {
    var app = this;
    app.addAccount = function(addData) {
        console.log('form submited');
        console.log(this.addData);
        $http.post('/api/accounts', this.addData);
    }
})
