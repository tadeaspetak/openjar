'use strict';

//routing
		angular.module('openjar').config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
				$urlRouterProvider.otherwise("/");

				$stateProvider
						.state('home', {
							url: "/",
							templateUrl: "public/partials/home.html",
							controller: 'HomeController'
						});
			}])