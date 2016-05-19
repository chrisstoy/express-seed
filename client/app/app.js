
(function (window, angular) {
	'use strict';

// Declare app level module which depends on views, and components
	var module = angular.module('sampleApp', [
		'ngRoute',
		'ui.bootstrap'
	]);

	module.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/', {
			template: '<example></example>'
		});
		$routeProvider.otherwise({
			redirectTo: '/'
		});

	}]);

})(window, window.angular);