angular.module('userApp',['appRoutes', 'userControllers', 'userServices', 'ngAnimate', 'mainController', 'authServices', 'accountControllers','accountServices', 'budgetControllers', 'budgetServices'])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
})
