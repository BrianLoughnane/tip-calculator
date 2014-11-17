angular.module('tcApp')
	.controller('NewMealCtrl', function($location, earnings) {
		this.basePrice = 0;
		this.taxRate = 0;
		this.tipRate = 0;

		this.subtotal = 0;
		this.tip = 0;
		this.total = 0;	

		this.$watch('basePrice', function() {
			this.taxRatePercentage = (this.taxRate / 100);
			this.subtotal = this.basePrice + (this.basePrice * this.taxRatePercentage);
			this.tipRatePercentage = this.tipRate/100;
			this.tip = this.basePrice * this.tipRatePercentage;
			this.total = this.subtotal + this.tip;
		});

		this.$watch('taxRate', function() {
			this.taxRatePercentage = (this.taxRate / 100);
			this.subtotal = this.basePrice + (this.basePrice * this.taxRatePercentage);
			this.total = this.subtotal + this.tip;
		});

		this.$watch('tipRate', function() {
			this.tipRatePercentage = this.tipRate/100;
			this.tip = this.basePrice * this.tipRatePercentage;
			this.total = this.subtotal + this.tip;
		});

		this.$watch('tipTotal', function() {
			this.averageTip = this.tipTotal / this.mealCount;		
		});
		
		this.$watch('mealCount', function() {
			this.averageTip = this.tipTotal / this.mealCount;		
		});

		this.submit = function() {
			if(this.myForm.$valid) {
				earnings.mealCount++;
				earnings.tipTotal += this.tip;
				earnings.averageTip = earnings.tipTotal / earnings.mealCount;

				this.basePrice = 0;

				$location.url('/my-earnings');
			}
		};

	});