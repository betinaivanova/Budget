angular.module('mainController', ['authServices'])

.controller('mainCtrl', function(Auth, $timeout, $location) {
    var app = this;

    this.doLogin = function(loginData) {
        app.loading = true;
        app.errorMsg = false;

        Auth.login(app.loginData).then(function(data) {
            
            if(data.data.success) {
                // Create Success Message
                app.loading = false;
                app.successMsg = data.data.message;
                $timeout(function() {
                    // Redirect to home page or login page
                    $location.path('/home');
                }, 2000)
                
            } else {
                // Create Error Message
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });
    }
});


 