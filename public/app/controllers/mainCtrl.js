angular.module('mainController', ['authServices'])

.controller('mainCtrl', function(Auth, $timeout, $location, $rootScope, $window) {
    var app = this;

    $rootScope.$on('$routeChangeStart', function() {
        
        if(Auth.isLoggedIn()) {
            app.isLoggedIn = true;
            Auth.getUser().then(function(data) {
                app.email = data.data.email;
            });
        } else {
            app.isLoggedIn = false;
            app.email = '';
        }

        if($location.hash() == '_=_') $location.hash(null);
    });

    this.facebook = function() {
        // console.log($window.location.host); localhost:8080
        // console.log($window.location.protocol); http:
        $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/facebook';
    }

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
                    $location.path('/budget');
                    app.loginData = '';
                    app.successMsg = '';
                }, 2000)
                
            } else {
                // Create Error Message
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });
    }

    this.logout = function() {
        Auth.logout();
        $location.path('/logout');
        $timeout(function() {
            $location.path('/');
        }, 3000);
    };
});


 