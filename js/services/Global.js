'use strict';

//Global service for global variables
angular.module('openjar').factory('Global', ['$cookies',
	function($translate, $cookies) {
		return{
			user: function() {
				return window.user;
			},
			authenticated: function() {
				return !!window.user;
			}
		};
	}
]);