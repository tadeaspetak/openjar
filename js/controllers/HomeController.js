'use strict';
angular.module('openjar.controllers').controller('HomeController', ['$animate', '$rootScope', '$timeout', '$scope', 'Recipes',
	function($animate, $rootScope, $timeout, $scope, Recipes) {

		//first set of ingredients
		$timeout(function() {
			$rootScope.inventory.push({text: 'butter'});
		}, 1000);

		$timeout(function() {
			$rootScope.inventory.push({text: 'milk'});
		}, 1800);

		$timeout(function() {
			$rootScope.inventory.push({text: 'eggs'});
		}, 2600);

		$scope.search = function() {
			var recipes = [];

			$rootScope.inventory.forEach(function(ingredient) {
				ingredient = ingredient.text;
				console.log(ingredient);
				$rootScope.getFromCache(ingredient, Recipes.get, function(result) {
					for (var i in result['matches']) {
						var recipe = result['matches'][i];
						recipe.score = 0;
						recipe.have = [];
						recipe.dontHave = [];

						var goOn = true;
						if (recipe.imageUrlsBySize && '90' in recipe.imageUrlsBySize) {
							recipe.image = recipe.imageUrlsBySize['90'].replace("s90-c", "s360-c");
						}
						else {
							goOn = false;
						}

						for (var a in $rootScope.required) {
							if (recipe.ingredients.indexOf($rootScope.required[a]) < 0) {
								goOn = false;
								break;
							}
						}
						if (!goOn) {
							continue;
						}

						//go through ingredients and increase score if there is a match in the shopping list
						for (var j in recipe.ingredients) {
							var ingredient = recipe.ingredients[j];

							var all = $rootScope.inventory.concat($rootScope.common);
							var doWeHaveIt = false;
							for (var a in all) {
								if (all[a].text == ingredient) {
									doWeHaveIt = true;
									break;
								}
							}

							if (doWeHaveIt) {
								recipe.score++;
								recipe.have.push(ingredient);
							}
							else {
								recipe.dontHave.push(ingredient);
							}
						}

						//add to resulst only when there is at least two matches
						if (recipe.score > 1) {
							recipes.push(recipe);
						}
					}
				});
			});

			recipes.sort(function(a, b) {
				if (a.score < b.score)
					return 1;
				if (a.score > b.score)
					return -1;

				if (a.dontHave.length < b.dontHave.length)
					return -1;
				if (a.dontHave.length > b.dontHave.length)
					return 1;

				return 0;
			}).forEach(function(recipe) {
				//console.log(recipe);
			});

			$rootScope.recipes = recipes.slice(0, 20);
		};

		$scope.search();

		$scope.inventoryLeft = function(item, e) {
			var $target = $(e.target);
			if ($target.hasClass("selected")) {
				$target.removeClass("selected");
				$rootScope.required.splice($rootScope.required.indexOf(item), 1);
				$scope.search();
			}
			else {
				$rootScope.inventory.splice($rootScope.inventory.indexOf(item), 1);
				$scope.search();
			}
		};

		$scope.inventoryRight = function(item, e) {
			$(e.target).addClass("selected");
			$rootScope.required.push(item);
			$scope.search();
		};


	}]);