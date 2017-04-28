angular.module('userControllers',['userServices'])

.controller('regCtrl', function($http, $location, $timeout, User) {

    var app = this;

    this.regUser = function(regData) {
        app.loading = true;
        app.errorMsg = false;

        User.create(app.regData).then(function(data) {
            
            if(data.data.success) {
                // Create Success Message
                app.loading = false;
                app.successMsg = data.data.message;
                $timeout(function() {
                    // Redirect to home page or login page
                    $location.path('/login');
                }, 2000)
                
            } else {
                // Create Error Message
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });
    };
});



