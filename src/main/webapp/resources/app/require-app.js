require.config({
	baseUrl : "public/vendor",
	paths : {
		'angular' : 'angular/angular.min',
		'angular-route' : 'angular-route/angular-route.min',
		'angularAMD' : 'angularAMD/angularAMD.min'
	},
    shim: { 'angularAMD': ['angular'], 'angular-route': ['angular'] },
	deps : ['public/resources/app/route.min.js?v=' + '0.0.1',
	        'public/resources/app/app.min.js?v=' + '0.0.1',
	        'public/resources/app/directives.min.js?v=' + '0.0.1',
	        'public/resources/app/components.min.js?v=' + '0.0.1',
	        'public/resources/app/filters.min.js?v=' + '0.0.1',
	        'public/resources/app/services.min.js?v=' + '0.0.1',
	        'public/resources/js/all.js?v=' + '0.0.1'
	       ]
});