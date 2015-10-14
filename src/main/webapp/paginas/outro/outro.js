'use strict';

app.register.controller('OutroCtrl', ['$scope', '$http', function($scope, $http) {
   	$scope.valor = "esta é o outro controller";

	$http.get('/restfull/controller/teste/id/1').success(function(result) {
		$scope.valor = $scope.valor + result;
	});
}]);
