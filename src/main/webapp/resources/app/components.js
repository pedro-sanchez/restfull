'use strict';

app.directive('inputLabel', ['$parse', '$http',
function($parse, $http) {

	return {
		restrict : 'E',
        transclude: true,
        scope: {
        	label: '=label',
        },
		require : '?label',
		templateUrl : 'public/resources/components/input-label.html',
		link : function(scope, element, attrs) {
			scope.forId = attrs.forId;
			scope.label = i18n(attrs.label);
			scope.required = attrs.ngRequired;
		}
	};
}]);


app.directive('inputText', ['$parse', '$http',
function($parse, $http) {

	return {
		restrict : 'E',
        scope: {
        	id: '=id',
        	label: '=label',
        	ngModel: '=',
        	ngDisabled: '=',
        	ngRequired: '=',
            ngChange: '&',
            ngBlur: '&'
        },
        require : '?ngModel',
		templateUrl : 'public/resources/components/input-text.html',
		link : function(scope, element, attrs, ngModelCtrl) {

			scope.id = attrs.id;
			scope.label = i18n(attrs.label);
			scope.tooltip = attrs.tooltip;
			scope.placeholder = attrs.placeholder;

			var input = $(element).contents()[0];

			input = ($(input).find("input")[0]);

			scope.onChangeDirective = function () {
				if(!$.isEmptyObject(attrs.mascara)){
					scope.ngModel = eval(attrs.mascara+"('"+scope.ngModel+"')");
				}
				scope.ngChange();
			}

			if (!$.isEmptyObject(attrs.autofocus) && attrs.autofocus){
				$(input).attr("autofocus", "true");
			}

			scope.hasLabel = function () {
				return !$.isEmptyObject(attrs.label);
			}

		}
	};
}]);

app.directive('inputNumber', ['$parse', '$http',
function($parse, $http) {

	return {
		restrict : 'E',
        scope: {
        	id: '=id',
        	label: '=label',
        	ngModel: '=',
        	ngDisabled: '=',
        	ngRequired: '=',
            ngChange: '&',
            ngBlur: '&'
        },
        require : '?ngModel',
		templateUrl : 'public/resources/components/input-text.html',
		link : function(scope, element, attrs, ngModelCtrl) {

			scope.id = attrs.id;
			scope.label = attrs.label;
			scope.tooltip = attrs.tooltip;
			scope.placeholder = attrs.placeholder;

			var input = $(element).contents()[0];
			input = ($(input).find("input")[0]);

			scope.onChangeDirective = function () {
				scope.ngModel = eval("Integer('"+scope.ngModel+"')");
				scope.ngChange();
			}

			if (!$.isEmptyObject(attrs.autofocus) && attrs.autofocus){
				$(input).attr("autofocus", "true");
			}

			scope.hasLabel = function () {
				return !$.isEmptyObject(attrs.label);
			}

		}
	};
}]);

app.directive('checkBox', ['$parse', '$http',
function($parse, $http) {

	return {
		restrict : 'E',
        scope: {
        	id: '=id',
        	label: '=label',
        	ngModel: '=',
        	ngDisabled: '=',
        	ngRequired: '=',
        	ngClick: '&'
        },
        require : '?ngModel',
		templateUrl : 'public/resources/components/check-box.html',
		link : function(scope, element, attrs, ngModelCtrl) {

			scope.id = attrs.id;
			scope.label = attrs.label;
			scope.tooltip = attrs.tooltip;
			scope.placeholder = attrs.placeholder;

			var input = $(element).contents()[0];
			input = ($(input).find("input")[0]);

			if (!$.isEmptyObject(attrs.autofocus) && attrs.autofocus){
				$(input).attr("autofocus", "true");
			}

			scope.hasLabel = function () {
				return !$.isEmptyObject(attrs.label);
			}

		}
	};
}]);



app.directive('comboBox', ['$parse', '$http',
function($parse, $http) {

	return {
		restrict : 'E',
        scope: {
        	id: '=id',
        	label: '=label',
        	ngModel: '=',
        	ngDisabled: '=',
        	ngRequired: '=',
        	options: '=',
            ngChange: '&',
            ngBlur: '&'
        },
        require : '?ngModel',
		templateUrl : 'public/resources/components/combo-box.html',
		link : function(scope, element, attrs, ngModelCtrl) {

			scope.id = attrs.id;
			scope.label = attrs.label;
			scope.tooltip = attrs.tooltip;
			scope.emptyMessage = attrs.emptyMessage;
			scope.name = attrs.name;

			if ($.isEmptyObject(attrs.emptyMessage)) {
				scope.emptyMessage = "select.default";
			}

			if ($.isEmptyObject(attrs.name)) {
				scope.name = "nome";
			}

			var input = $(element).contents()[0];

			input = ($(input).find("input")[0]);

			scope.selectValue = function (option) {
				if ($.isEmptyObject(attrs.value)) {
					return option;
				}
				return option[attrs.value];
			}

			if (!$.isEmptyObject(attrs.autofocus) && attrs.autofocus) {
				$(input).attr("autofocus", "true");
			}

			scope.hasLabel = function () {
				return !$.isEmptyObject(attrs.label);
			}

		}
	};
}]);