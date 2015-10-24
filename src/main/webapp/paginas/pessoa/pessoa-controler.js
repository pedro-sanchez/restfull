'use strict';

app.register.controller('HomeCtrl', ['$scope', '$http', 'baseController', function($scope, $http, baseController) {

	angular.extend($scope, baseController);

	$scope.baseURL="/restfull/controller/pessoa";

	console.log($scope.getURL());


	$scope.valor = "esta é o home controller";

	$scope.entity = {};
	$scope.data = {};


	$scope.estados = [{"id":1, "nome": "MS"},
	                  {"id":2, "nome": "SP"},
	                  {"id":3, "nome": "PR"},
	                  {"id":4, "nome": "SC"},
	                  {"id":5, "nome": "RS"}];


	$http.get('/restfull/controller/pessoa/ping').success(function(result) {
		$scope.valor = $scope.valor + result;
	});
	$http.get('/restfull/controller/pessoa/id/1').success(function(result) {
		$scope.valor = $scope.valor + result;
	});

	$scope.save = function(){
		alert("salvou");
	};

	$scope.remover = function(){
		alert("removeu");
	};

	$scope.naoRemover = function(){
		alert("aborta");
	};


}]);