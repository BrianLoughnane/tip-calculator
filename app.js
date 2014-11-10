angular.module('myApp',['ngRoute', 'ngAnimate'])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'home.html'
			})
			.when('/new-meal', {
				templateUrl: 'new-meal.html',
				controller: 'NewMealCtrl'
			})
			.when('/my-earnings', {
				templateUrl: 'my-earnings.html',
				controller: 'MyEarningsCtrl'
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
	})
	.run(function($rootScope, $location, $timeout) {

		$rootScope.tipTotal = 0;
		$rootScope.mealCount = 0;
		$rootScope.averageTip = 0;

		// $rootScope.$watch('tipTotal', function() {
		// 	$rootScope.averageTip = $rootScope.tipTotal / $rootScope.mealCount;
		// 	if(isNaN($rootScope.averageTip)) {
		// 		$rootScope.averageTip = 0;
		// 	}
		// })

	})
	// .controller('NewMealCtrl', function($scope, $rootScope, $location) {
	.controller('NewMealCtrl', function($scope, $rootScope, $location) {
		$scope.basePrice = 0;
		$scope.taxRate = 0;
		$scope.tipRate = 0;

		$scope.subtotal = 0;
		$scope.tip = 0;
		$scope.total = 0;	

		$scope.$watch('basePrice', function() {
			$scope.taxRatePercentage = ($scope.taxRate / 100);
			$scope.subtotal = $scope.basePrice + ($scope.basePrice * $scope.taxRatePercentage);
			$scope.tipRatePercentage = $scope.tipRate/100;
			$scope.tip = $scope.basePrice * $scope.tipRatePercentage;
			$scope.total = $scope.subtotal + $scope.tip;
		});

		$scope.$watch('taxRate', function() {
			$scope.taxRatePercentage = ($scope.taxRate / 100);
			$scope.subtotal = $scope.basePrice + ($scope.basePrice * $scope.taxRatePercentage);
			$scope.total = $scope.subtotal + $scope.tip;
		});

		$scope.$watch('tipRate', function() {
			$scope.tipRatePercentage = $scope.tipRate/100;
			$scope.tip = $scope.basePrice * $scope.tipRatePercentage;
			$scope.total = $scope.subtotal + $scope.tip;
		});

		$scope.$watch('tipTotal', function() {
			$scope.averageTip = $scope.tipTotal / $scope.mealCount;		
		});
		
		$scope.$watch('mealCount', function() {
			$scope.averageTip = $scope.tipTotal / $scope.mealCount;		
		});

		$scope.submit = function() {
			if($scope.myForm.$valid) {
				$rootScope.mealCount += 1;
				$rootScope.tipTotal += $scope.tip;
				$rootScope.basePrice = 0;
				$rootScope.averageTip = $scope.tipTotal / $scope.mealCount;

				// $rootScope.$broadcast("submit", aveTip, $scope.tipTotal, $scope.mealCount);
				
				$location.url('/my-earnings');
			}
		};

	})
	// .controller('MyEarningsCtrl', function($scope, $rootScope, averageTip) {
	.controller('MyEarningsCtrl', function($scope, $rootScope) {
		$scope.reset = function() {
			$rootScope.tipTotal = 0;
			$rootScope.mealCount = 0;
			$rootScope.averageTip = 0;
		}

		// $rootScope.$on("submit", function(event, aveTip, tipTotal, mealCount) {
		// 	$rootScope.averageTip = aveTip;
		// 	$rootScope.tipTotal = tipTotal;
		// 	$rootScope.mealCount = mealCount;
		// 	console.log('on submit listener fired');
		// 	console.log($scope.averageTip);

		// });

		// $scope.$on("submit", function(event, aveTip) {
		// 	$scope.averageTip = aveTip;
		// 	console.log('on submit listener fired');
		// 	console.log($scope.averageTip);

		// });
		
		// $rootScope.averageTip = averageTip;

	});














