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

    .when('/account', {
        templateUrl : 'app/views/pages/account-list.html',
        controller: 'accountCtrl',
        controllerAs : 'account'
    })

     .when('/details', {
        templateUrl : 'app/views/pages/account-details.html',
        controller: 'budgetCtrl',
        controllerAs : 'budget'
      
    })

    .when('/category', {
        templateUrl : 'app/views/pages/category.html',
        controller: 'categoryCtrl',
        controllerAs : 'category'
      
    })

    .when('/calculator', {
        templateUrl : 'app/views/pages/calculator.html',
        controller: 'calculatorCtrl',
      
    })

    .when('/currency', {
        templateUrl : 'app/views/pages/currency.html',
        controller: 'apiCtrl',
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
    .otherwise({ redirectTo : '/'} );

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});