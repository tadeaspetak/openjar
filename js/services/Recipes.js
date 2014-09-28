'use strict';

angular.module('openjar').factory('Recipes', ['$http', function($http) {
		return {
			get: function(ingredient) {
				return $http.get('http://api.yummly.com/v1/api/recipes?_app_id=156779d2&_app_key=9fc671891e2922bd8ae607a4bb1ce93a&maxResult=400&q=' + ingredient, {cache: true});
			},
			getDetail:function(id){
				return $http.get('http://api.yummly.com/v1/api/recipe/' + id + '?_app_id=156779d2&_app_key=9fc671891e2922bd8ae607a4bb1ce93a');
			}
		};
	}]);