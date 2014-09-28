'use strict';
angular.module('openjar.controllers').controller('DetailController', ['$rootScope', '$scope', '$state', 'Recipes',
	function($rootScope, $scope, $state, Recipes) {
		var id = $state.params.id;

		$rootScope.getFromCache(id, Recipes.getDetail, function(recipe) {
			$scope.recipe = recipe;

			for (var i in $rootScope.recipes) {
				if ($rootScope.recipes[i].id == id) {
					$scope.recipeOverview = $rootScope.recipes[i];
				}
			}
		});

		$scope.youGotLeft = function(item, e) {
			$scope.recipeOverview.dontHave.push(item);
			$scope.recipeOverview.have.splice($scope.recipeOverview.have.indexOf(item), 1);
		};

		$scope.youGotRight = function(item, e) {
			$(e.target).addClass("right");
			$scope.recipeOverview.dontHave.push(item);
			$scope.recipeOverview.have.splice($scope.recipeOverview.have.indexOf(item), 1);
		};

		$scope.youNeedLeft = function(item, e) {
			$scope.recipeOverview.have.push(item);
			$scope.recipeOverview.dontHave.splice($scope.recipeOverview.dontHave.indexOf(item), 1);
		};

		$scope.youNeedRight = function(item, e) {
			$(e.target).addClass("right");
			$scope.recipeOverview.have.push(item);
			$scope.recipeOverview.dontHave.splice($scope.recipeOverview.dontHave.indexOf(item), 1);
		};
	}]);