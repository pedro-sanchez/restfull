var app = angular.module('App', ["ngRoute"]);

define(['angularAMD', 'angular-route'], function (angularAMD) {
	app.config(['$routeProvider', function($routeProvider) {
	        $routeProvider
	        /** HOME **/
	        .when('/home', angularAMD.route({
				templateUrl : 'paginas/pessoa/pessoa-list.html',
				controller: 'HomeCtrl',
				controllerUrl: 'paginas/pessoa/pessoa-controler.js'
			}))
	        .when('/outro', angularAMD.route({
	    		templateUrl : 'paginas/outro/outro.html',
				controller: 'OutroCtrl',
				controllerUrl: 'paginas/outro/outro.js'
			}))
			.otherwise({
				redirectTo : '/home'
			});
	 }]);
	return angularAMD.bootstrap(app);
});