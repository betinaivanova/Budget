angular.module('appRoutes', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {

    $routeProvider

    .when('/', {
        templateUrl : 'app/views/pages/home.html'
    })

    .when('/register', {
        templateUrl : 'app/views/pages/register.html',
        controller : 'regCtrl',
        controllerAs : 'register'
    })

    .when('/login', {
        templateUrl : 'app/views/pages/login.html'
    })

    .when('/logout', {
        templateUrl : 'app/views/pages/logout.html'
    })

    .when('/facebook/:token', {
        templateUrl : 'app/views/pages/social/social.html',
        controller : 'facebookCtrl',
        controllerAs : 'facebook'
    })

    .when('/facebookerror', {
        templateUrl : 'app/views/pages/login.html',
        controller : 'facebookCtrl',
        controllerAs : 'facebook'
    })
    // .otherwise({ redirectTo : '/'} );

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});