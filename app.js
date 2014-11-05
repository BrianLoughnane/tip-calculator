angular.module('myApp',['ngRoute'])
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
				controller: 'MyEarningsCtrl',
				resolve: {
					averageTip: function($rootScope) {
						 // var bogus = 3;
						 // return bogus;
						$rootScope.averageTip = $rootScope.tipTotal / $rootScope.mealCount;
						if(isNaN($rootScope.averageTip)) {
							$rootScope.averageTip = 0;
						}
						
						return $rootScope.averageTip; 
					}
					// mealCount: 4,
					// averageTip: 3,
				}
			})
			.otherwise({
				template: '<p>Sorry, page not found!</p>'
			})
	})
	.run(function($rootScope) {

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
	.controller('MyEarningsCtrl', function($scope, $rootScope, averageTip) {

		$scope.reset = function() {
			$rootScope.tipTotal = 0;
			$rootScope.mealCount = 0;
			$rootScope.averageTip = 0;
		}

		$rootScope.averageTip = averageTip;

	})
	// .controller('MyCtrl', function($scope, tipTotal) {
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
				$location.url('/my-earnings');
			}
		};

	});