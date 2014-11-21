angular.module('tcApp')
	.config(['$routeProvider', 
		function($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: 'home/home.html'
				})
				.when('/new-meal', {
					templateUrl: 'new-meal/new-meal.html',
					controller: 'NewMealCtrl',
					controllerAs: 'nm'
				})
				.when('/my-earnings', {
					templateUrl: 'my-earnings/my-earnings.html',
					controller: 'MyEarningsCtrl',
					controllerAs: 'c'
					// ,
					// resolve: {
					// 	averageTip: function($rootScope) {
					// 		$rootScope.averageTip = $rootScope.tipTotal / $rootScope.mealCount;
							
					// 		if(isNaN($rootScope.averageTip)) {
					// 			$rootScope.averageTip = 0;
					// 		}
							
					// 		return $rootScope.averageTip; 
					// 	} 
					// }
				})
				.otherwise({
					template: '<p>Sorry, page not found!</p>'
				})
		}]);