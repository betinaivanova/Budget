

angular.module('budgetControllers', [])

.controller('budgetCtrl', function($http, $scope) {
    $http.get('/api/details').then(function (res){
            $scope.accounts = res.data;
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

	    	var pieData = [{value: totalExpense,color:"#f2dede"},
		        		{value : totalIncome,color : "#dff0d8"}];


	      	//Display the data
	    	new Chart(document.getElementById("canvas").getContext("2d")).Pie(pieData);
	    };

    $scope.deleteBudget = function($event) {
            var budgettId = $($event.currentTarget).parent().parent().attr('data-account-id');
            $http.put('/api/details/' + budgettId);
            $($event.currentTarget).parent().parent().remove();
        }
})