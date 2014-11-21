angular.module('tcApp')
	.controller('NewMealCtrl', function($scope, $location, earnings) {
		var nm = this;

		nm.meal = {

		}
		
		nm.basePrice = 0;
		nm.taxRate = 0;
		nm.tipRate = 0;

		nm.taxRatePercentage = (nm.taxRate / 100);
		nm.tipRatePercentage = nm.tipRate/100;

		nm.subtotal = 0;
		nm.tip = 0;
		nm.total = 0;	

		nm.submit = function() {
			if(nm.myForm.$valid) {
				earnings.mealCount++;
				earnings.tipTotal += nm.tip;
				earnings.averageTip = earnings.tipTotal / earnings.mealCount;

				$location.url('/my-earnings');
			}
		};


		$scope.$watch('nm.basePrice'
			, function() {
				
				nm.subtotal = nm.basePrice + (nm.basePrice * nm.taxRatePercentage);
				nm.tip = nm.basePrice * nm.tipRatePercentage;
				nm.total = nm.subtotal + nm.tip;
		});

		$scope.$watch('nm.taxRate'
			, function() {

			nm.taxRatePercentage = (nm.taxRate / 100);
			nm.subtotal = nm.basePrice + (nm.basePrice * nm.taxRatePercentage);
			nm.total = nm.subtotal + nm.tip;
		});

		$scope.$watch('nm.tipRate'
			, function() {

			nm.tipRatePercentage = nm.tipRate/100;
			nm.tip = nm.basePrice * nm.tipRatePercentage;
			nm.total = nm.subtotal + nm.tip;
		});

	});