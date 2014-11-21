angular.module('tcApp')
	.controller('MyEarningsCtrl', ['earnings', 
		function(earnings) {
			this.e = earnings;
	}]);