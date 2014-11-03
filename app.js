angular.module('myApp',['ngRoute'])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'home.html'
			})
			.when('/new-meal', {
				templateUrl: 'new-meal.html',
				controller: 'MyCtrl'
			})
			.when('/my-earnings', {
				templateUrl: 'my-earnings.html',
				controller: 'MyCtrl'
			})
			.otherwise({
				template: '<p>Sorry, page not found!</p>'
			})
	})
	.controller('MyCtrl', function($scope) {
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

		$scope.tipTotal = 0;
		$scope.mealCount = 0;
		$scope.averageTip = 0;

		$scope.$watch('tipTotal', function() {
			$scope.averageTip = $scope.tipTotal / $scope.mealCount;		
		});
		
		$scope.$watch('mealCount', function() {
			$scope.averageTip = $scope.tipTotal / $scope.mealCount;		
		});

		$scope.submit = function() {
			if($scope.myForm.$valid) {
				$scope.mealCount += 1;
				$scope.tipTotal += $scope.tip;
				$scope.basePrice = 0;
			}
		};

		$scope.cancel = function() {
			$scope.basePrice = 0;
			$scope.taxRate = 0;
			$scope.tipRate = 0;
		};

		$scope.reset = function() {
			$scope.cancel();
			$scope.tipTotal = 0;
			$scope.mealCount = 0;
			$scope.averageTip = 0;
		};
	});
	// .controller('myController', function($scope) {
	// 	$scope.basePrice = 0;
	// 	$scope.taxRate = 0;
	// 	$scope.tipRate = 0;

	// 	$scope.subtotal = 0;
	// 	$scope.tip = 0;
	// 	$scope.total = 0;	

	// 	$scope.$watch('basePrice', function() {
	// 		$scope.taxRatePercentage = ($scope.taxRate / 100);
	// 		$scope.subtotal = $scope.basePrice + ($scope.basePrice * $scope.taxRatePercentage);
	// 		$scope.tipRatePercentage = $scope.tipRate/100;
	// 		$scope.tip = $scope.basePrice * $scope.tipRatePercentage;
	// 		$scope.total = $scope.subtotal + $scope.tip;
	// 	});

	// 	$scope.$watch('taxRate', function() {
	// 		$scope.taxRatePercentage = ($scope.taxRate / 100);
	// 		$scope.subtotal = $scope.basePrice + ($scope.basePrice * $scope.taxRatePercentage);
	// 		$scope.total = $scope.subtotal + $scope.tip;
	// 	});

	// 	$scope.$watch('tipRate', function() {
	// 		$scope.tipRatePercentage = $scope.tipRate/100;
	// 		$scope.tip = $scope.basePrice * $scope.tipRatePercentage;
	// 		$scope.total = $scope.subtotal + $scope.tip;
	// 	});

	// 	$scope.tipTotal = 0;
	// 	$scope.mealCount = 0;
	// 	$scope.averageTip = 0;

	// 	$scope.$watch('tipTotal', function() {
	// 		$scope.averageTip = $scope.tipTotal / $scope.mealCount;		
	// 	});
		
	// 	$scope.$watch('mealCount', function() {
	// 		$scope.averageTip = $scope.tipTotal / $scope.mealCount;		
	// 	});

	// 	$scope.submit = function() {
	// 		if($scope.myForm.$valid) {
	// 			$scope.mealCount += 1;
	// 			$scope.tipTotal += $scope.tip;
	// 			$scope.basePrice = 0;
	// 		}
	// 	};

	// 	$scope.cancel = function() {
	// 		$scope.basePrice = 0;
	// 		$scope.taxRate = 0;
	// 		$scope.tipRate = 0;
	// 	};

	// 	$scope.reset = function() {
	// 		$scope.cancel();
	// 		$scope.tipTotal = 0;
	// 		$scope.mealCount = 0;
	// 		$scope.averageTip = 0;
	// 	};

	// });

