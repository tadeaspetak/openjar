angular.module('openjar.controllers', [])

angular.module('openjar', [
	'ui.router',
	'ngTouch',
	'ngAnimate',
	'ui.bootstrap',
	'openjar.controllers'
])
	//routing
	.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
			$urlRouterProvider.otherwise("/");

			$stateProvider
				.state('home', {
					url: "/",
					templateUrl: "partials/home.html",
					controller: 'HomeController'
				})
				.state('detail', {
					url: "/{id}",
					templateUrl: "partials/detail.html",
					controller: 'DetailController'
				});
		}])
	//HTML5 location mode
	.config(['$locationProvider', function($locationProvider) {
			$locationProvider.html5Mode(true).hashPrefix('!');
		}
	])
	.run(['$rootScope', '$location', '$anchorScroll', function($rootScope, $location, $anchorScroll) {
			//$rootScope.inventory = ['parsley', 'lemons', 'kale', 'Jerusalem artichoke', 'Veal', 'maccheroni', 'carrots', 'pizza dough', 'Potato', 'Cress', 'Gouda cheese', 'red peppers', 'salat', 'flatfish', 'bacon', 'tomatoes', 'yogurt', 'zucchini'];
			$rootScope.inventory = [
				{text: 'broccoli', expires: true},
				{text: 'cheddar', expires: true},
				{text: 'butter'},
				{text: 'milk'},
				{text: 'eggs'}
			];
			$rootScope.required = [];
			$rootScope.common = [
				{text: 'flour'},
				{text: 'salt'},
				{text: 'water'},
				{text: 'sugar'}];

			$rootScope.getFromCache = function(item, call, done) {
				var result = localStorage.getItem(item);
				if (!result) {
					call(item).success(function(data) {
						localStorage.setItem(item, JSON.stringify(data));
						done(data);
					});
				}
				else {
					done(JSON.parse(result));
				}
			};

			/**
			 * Return "active" if given path is currently active (used for links classes in menu).
			 * 
			 * @param {string} path
			 * @returns {String}
			 */

			$rootScope.isActive = function(path) {
				return $location.path().substr(0, path.length) === path ? "active" : "";
			}; 		/**
			 * Capture the state change event.
			 */

			$rootScope.$on('$stateChangeSuccess', function(e, state) {
				//get the current controller (if available) and state on state change.
				if (state.controller) {
					$rootScope.controller = state.controller.toLowerCase().replace("controller", '');
				}
				$rootScope.state = state.name;

				//send a pageview to Google Analytics
				//(much easier and more flexible than adding it to every controller)
				//ga('send', 'pageview', $rootScope.state);
			});

			/** 
			 * An ugly hack, but it is needed in order for the #anchors to work properly
			 * if <base> tag is used in head (needed if nested URLs are used in an app).
			 * 
			 * Forutnately does not take too much time but would be great if could be avoided, of course.
			 * 
			 * What it does
			 * ----------------
			 * Say you are at 'localhost/contact', 'localhost/home' being your home site.
			 * 
			 * If you have an anchor <a href="#map">Map</a> pointing to a footer of the site
			 * site, it will be changed to localhost/home#map if <base> tag is used. Where you want
			 * it to point is localhost/contact#map, of course.
			 * 
			 * Every time state is changed (=viewContentLoaded), we need to change the anchors back
			 * (from localhost/contact#map back to #map) and then change them in order to work for the
			 * current state (e.g. localhost/partners#map).
			 */

			/*$rootScope.$on('$viewContentLoaded', function() {
			 //scroll to whatever
			 $anchorScroll();
			 var pathname = $location.path();
			 //restore changed anchors (otherwise they may point to a different site/state)
			 $('a').each(function() {
			 var $this = $(this),
			 data = $this.data('href');
			 if (data) {
			 $this.attr("href", data);
			 }
			 });
			 //change anchors
			 $('a[href^="#"]').each(function() {
			 var $this = $(this),
			 link = $this.attr('href');
			 $this.data('href', link);
			 $this.attr('href', pathname + link);
			 });
			 });*/

			/**
			 * Contenteditable items.
			 */

			/*$(document).on('keypress', "[contenteditable=true]", function(e) {
			 var $this = $(this);
			 if (e.which === 13) {
			 e.preventDefault();
			 $this.blur();
			 }
			 });*/
		}]).animation('.inventory-item', function() {
	return {
		enter: enterList,
		leave: leaveList
	};
}).animation('.shoppingList-item', function() {
	return {
		enter: enterList,
		leave: leaveList
	};
});

function enterList(element, done, memo) {
	var $element = $(element);
	$element.addClass("moved");
	$element.css({'left': '-150px'}).animate({'left': 0}, {
		duration: 1000,
		easing: "easeOutBounce",
		complete: function() {
			$element.removeClass("moved");
			done();
		}
	});
}

function leaveList(element, done) {
	var $element = $(element);
	var left = $element.hasClass("right") ? '200px' : '-150px';
	$element.animate({'left': left}, {
		duration: 200,
		easing: "linear",
		complete: function() {
			done();
		}
	});
}