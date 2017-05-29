angular.module('userApp',['appRoutes', 'userControllers', 'userServices', 'ngAnimate', 'mainController', 'authServices', 'accountControllers','accountServices', 'budgetControllers', 'budgetServices','categoryControllers', 'categoryServices', 'calculatorControllers','apiCallControllers', 'apiServices'])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
})
