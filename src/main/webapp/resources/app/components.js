'use strict';

app.service('baseInput', [ function() {
	var baseInput = {};

	baseInput.base = function(scope, attrs) {
		scope.id = attrs.id;
		scope.label = i18n(attrs.label);
		scope.tooltip = i18n(attrs.tooltip);

		scope.hasLabel = function () {
			return !$.isEmptyObject(attrs.label);
		}
	};
	baseInput.autofocus = function(autofocus, element, selectorType) {
		if (!$.isEmptyObject(autofocus) && autofocus){
			var input = $(element).contents()[0];
			input = ($(input).find(selectorType)[0]);

			$(input).attr("autofocus", "true");
		}
	};

	baseInput.mask = function(scope, mask) {
		scope.onChangeDirective = function () {
			if(!$.isEmptyObject(mask)){
				scope.ngModel = eval(mask+"('"+scope.ngModel+"')");
			}
			scope.ngChange();
		}
	};

	return baseInput;
} ]);


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


app.directive('inputText', ['$parse', '$http', 'baseInput',
function($parse, $http, baseInput) {

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

			baseInput.base(scope, attrs);
			baseInput.autofocus(attrs.autofocus, element, "input");
			baseInput.mask(scope, attrs.mascara);

			scope.placeholder = i18n(attrs.placeholder);
		}
	};
}]);

app.directive('inputNumber', ['$parse', '$http', 'baseInput',
function($parse, $http, baseInput) {

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

			baseInput.base(scope, attrs);
			baseInput.autofocus(attrs.autofocus, element, "input");
			baseInput.mask(scope, "Integer");

			scope.placeholder = attrs.placeholder;
		}
	};
}]);

app.directive('checkBox', ['$parse', '$http', 'baseInput',
function($parse, $http, baseInput) {

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

			baseInput.base(scope, attrs);
			baseInput.autofocus(attrs.autofocus, element, "input");
			scope.placeholder = attrs.placeholder;

		}
	};
}]);

app.directive('comboBox', ['$parse', '$http', 'baseInput',
function($parse, $http, baseInput) {

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

			baseInput.base(scope, attrs);
			baseInput.autofocus(attrs.autofocus, element, "select");

			scope.emptyMessage = attrs.emptyMessage;
			if ($.isEmptyObject(attrs.emptyMessage)) {
				scope.emptyMessage = "select.default";
			}

			if ($.isEmptyObject(attrs.name)) {
				scope.name = "nome";
			}

			scope.selectValue = function (option) {
				if ($.isEmptyObject(attrs.value)) {
					return option;
				}
				return option[attrs.value];
			}

		}
	};
}]);

app.directive('baseButton', ['$parse', '$http', 'baseInput',
function($parse, $http, baseInput) {
	return {
		restrict : 'E',
        scope: {
        	id: '=id',
        	label: '=label',
        	ngDisabled: '=',
        	ngClick: '&'
        },
		templateUrl : 'public/resources/components/button.html',
		link : function(scope, element, attrs, ngModelCtrl) {
			baseInput.base(scope, attrs);
			scope.class = attrs.class;
			scope.icon = attrs.icon;

			scope.hasIcon = function () {
				return !$.isEmptyObject(attrs.icon);
			}

			scope.internalClick = function () {
				ngClick();
			}
		}
	};
}]);



app.directive('confirmButton', ['$parse', '$http', 'baseInput',
function($parse, $http, baseInput) {
	return {
		restrict : 'E',
        scope: {
        	id: '=id',
        	label: '=label',
        	ngDisabled: '=',
        	yesCallback: '&',
        	noCallback: '&'
        },
		templateUrl : 'public/resources/components/button.html',
		link : function(scope, element, attrs, ngModelCtrl) {
			baseInput.base(scope, attrs);
			scope.class = attrs.class;
			scope.icon = attrs.icon;

			scope.hasIcon = function () {
				return !$.isEmptyObject(attrs.icon);
			}

			scope.title = attrs.title;
			scope.message = attrs.message;

			scope.yes = attrs.yes;
			if ($.isEmptyObject(attrs.yes)) {
				scope.yes = "fw.btn.yes";
			}

			scope.yesTitle = attrs.yesTitle;
			if ($.isEmptyObject(attrs.yesTitle)) {
				scope.yesTitle = "fw.btn.yes.tooltip";
			}

			scope.no = attrs.no;
			if ($.isEmptyObject(attrs.no)) {
				scope.no = "fw.btn.no";
			}

			scope.noTitle = attrs.noTitle;
			if ($.isEmptyObject(attrs.noTitle)) {
				scope.noTitle = "fw.btn.no.tooltip";
			}

			scope.title = i18n(scope.title);
			scope.message = i18n(scope.message);
			scope.yes = i18n(scope.yes);
			scope.yesTitle = i18n(scope.yesTitle);
			scope.no = i18n(scope.no);
			scope.noTitle = i18n(scope.noTitle);

			scope.internalClick = function () {
				confirmDialog(scope.title, scope.message, scope.yes, scope.yesTitle, scope.yesCallback, scope.no, scope.noTitle, scope.noCallback);
			}
		}
	};
}]);