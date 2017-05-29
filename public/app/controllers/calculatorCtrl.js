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

    $scope.years = {};
    $scope.credit.yearsArr = [
        {value : '1', label : '1 година'},
        {value : '2', label : '2 години'},
        {value : '3', label : '3 години'},
        {value : '4', label : '4 години'},
        {value : '5', label : '5 години'},
        {value : '6', label : '6 години'},
        {value : '7', label : '7 години'},
        {value : '8', label : '8 години'},
        {value : '9', label : '9 години'},
        {value : '10', label : '10 години'},
        {value : '11', label : '11 години'},
        {value : '12', label : '12 години'},
        {value : '13', label : '13 години'},
        {value : '14', label : '14 години'},
        {value : '15', label : '15 години'},
        {value : '16', label : '16 години'},
        {value : '17', label : '17 години'},
        {value : '18', label : '18 години'},
        {value : '19', label : '19 години'},
        {value : '20', label : '20 години'},
    ];

    $scope.credit.years = $scope.credit.yearsArr[0].value;

    $scope.myvalue = false;
    $scope.sum = 0;
    $scope.amountCredit = 0;
    $scope.calculate = function() {
        $scope.myvalue = true;
        // $scope.sum = Math.floor(((Number($scope.amount) * 100) / 25) * (1 + (Number($scope.credit.levels)) * Number($scope.period)));
       

        $scope.amountCredit = Math.floor((Number($scope.income) - ((Number($scope.monthly) + Number($scope.payments))) * Number($scope.credit.levels)));
    }

});