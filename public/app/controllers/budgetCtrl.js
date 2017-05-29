

angular.module('budgetControllers', [])

.controller('budgetCtrl', function($http, $scope) {
        $scope.customs = [
            {name : 'bet'},
            {name : 'bet'},
            {name : 'bet'},
            {name : 'bet'},
            {name : 'bet'},
            {name : 'bet'},
            {name : 'bet'},
            {name : 'bet'}
        ];
    $http.get('/api/categories').then(function (res){
        $scope.categories = res.data;
        console.log($scope.categories);
    })
    $http.get('/api/details').then(function (res){
            $scope.budgets = res.data;
    })
    var app = this;
    app.createBudget = function(addData) {
        $http.post('/api/details', this.addData).then(function(res) {
        $http.get('/api/details').then(function (res){
            $scope.budgets = res.data;
            updateChart();
            })
        });
    }
    function updateChart() {
	    	var budgets = $scope.budgets;
	    	var totalExpense = 0;
	    	var totalIncome = 0;

	    	for (var budgetKey in budgets) {
	    		if (budgets[budgetKey].is_expense) {
	    			totalExpense += budgets[budgetKey].amount;
	    		}
	    		else {
	    			totalIncome += budgets[budgetKey].amount;
	    		}
	    	}

	    	var pieData = [{value: totalExpense,color:"#dff0d8"}, 
		        		{value : totalIncome,color : "#f2dede"}];


	      	//Display the data
	    	new Chart(document.getElementById("canvas").getContext("2d")).Pie(pieData);
	    };

    $scope.deleteBudget = function($event) {
            var budgetId = $($event.currentTarget).parent().parent().attr('data-budget-id');
            $http.put('/api/details/' + budgetId);
            $($event.currentTarget).parent().parent().remove();
        }
})