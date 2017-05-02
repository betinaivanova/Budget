angular.module('userApp',['appRoutes', 'userControllers', 'userServices', 'ngAnimate', 'mainController', 'authServices', 'accountControllers','accountServices'])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
})
