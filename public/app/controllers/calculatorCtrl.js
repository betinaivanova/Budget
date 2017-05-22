angular.module('calculatorControllers', [])

.controller('calculatorCtrl', function($scope) {

    //set selected item in list of option
    $scope.credit = {};
    $scope.credit.percentArr = [

        {value : '0.35', label : '35%'},
        {value : '0.40', label : '40%'},
        {value : '0.45', label : '45%'},
        {value : '0.50', label : '50%'},
        {value : '0.55', label : '55%'},
        {value : '0.60', label : '60%'},
        {value : '0.65', label : '65%'},
        {value : '0.70', label : '70%'}
    ];

    $scope.credit.levels = $scope.credit.percentArr[0].value;

    $scope.myvalue = false;
    $scope.sum = 0;
    $scope.amountCredit = 0;
    $scope.calculate = function() {
        $scope.myvalue = true;
        // $scope.sum = Math.floor(((Number($scope.amount) * 100) / 25) * (1 + (Number($scope.credit.levels)) * Number($scope.period)));
       

        $scope.amountCredit = Math.floor((Number($scope.income) - ((Number($scope.monthly) + Number($scope.payments))) * Number($scope.credit.levels)));
    }

});