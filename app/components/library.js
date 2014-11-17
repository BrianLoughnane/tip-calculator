angular.module('tcApp')

	.factory('earnings', function() {
		
		var earnings = {
			tipTotal: 0,
			mealCount: 0,
			averageTip: 0,
			reset: function () {
				earnings.tipTotal = 0;
				earnings.mealCount = 0;
				earnings.averageTip = 0;
			}
		}

		return earnings;
	});














