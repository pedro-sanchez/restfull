'use strict';

app.factory('baseController', function() {
	return {
		mode:"LIST_MODE",
		baseURL:"",
		entity:{'nome':'pedro'},
		selectedId:null,
		itens:[],
		getURL:function(){
			return this.baseURL;
		},
		list:function(){
			this.itens = [];
			//TODO do list
		},
		select:function(selected){
			this.selectedId = selected;
		},
		hasSelected:function(){
			if (this.selectedId) {
				return true;
			}

			return false;
		},
		loadDependencies:function(){//this method used to load list for combo etc;

		},
		reset:function(){//this method can be override to custons resets

		},
		baseReset:function(){
			this.entity = {};
			this.reset();
		},
		save:function(){
			$http.post(this.baseURL, this.entity).success(function() {
				console.log("fw.save.success");
				this.cancel();
			});
		},
		savePlus:function(){
			$http.post(this.baseURL, this.entity).success(function() {
				console.log("fw.save.success");
				this.baseReset();
			});
		},
		cancel:function(){
			this.mode = "LIST_MODE";
			//TODO dimiss modal
		}
	}
});

app.service('baseInput', [ function() {
	var baseInput = {};

	baseInput.base = function(scope, attrs) {
		scope.id = attrs.id;
		scope.label = i18n(attrs.label);
		scope.hint = i18n(attrs.hint);

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

	baseInput.maxlength = function(maxlength, element, selectorType) {
		if (!$.isEmptyObject(maxlength)){
			var input = $(element).contents()[0];
			input = ($(input).find(selectorType)[0]);

			$(input).attr("maxlength", maxlength);
		}
	};

	baseInput.labelHint = function(labelHint, element) {
		if(!$.isEmptyObject(labelHint)){

			//console.log("content 0 ",$(element).find("label"));
			//$(input).attr("title", labelHint);
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
			baseInput.labelHint(attrs.labelHint, element);
			baseInput.autofocus(attrs.autofocus, element, "input");
			baseInput.maxlength(attrs.maxlength, element, "input");
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
			baseInput.labelHint(attrs.labelHint, element);
			baseInput.autofocus(attrs.autofocus, element, "input");
			baseInput.maxlength(attrs.maxlength, element, "input");
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
			baseInput.labelHint(attrs.labelHint, element);
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
			baseInput.labelHint(attrs.labelHint, element);
			baseInput.autofocus(attrs.autofocus, element, "select");

			scope.emptyMessage = attrs.emptyMessage;
			if ($.isEmptyObject(attrs.emptyMessage)) {
				scope.emptyMessage = "select.default";
			}

			scope.name = "nome";
			if (!$.isEmptyObject(attrs.name)) {
				scope.name = attrs.name;
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
        	onClick: '&'
        },
		templateUrl : 'public/resources/components/button.html',
		link : function(scope, element, attrs, ngModelCtrl) {
			baseInput.base(scope, attrs);
			scope.class = attrs.class;
			scope.icon = attrs.icon;

			scope.hasIcon = function () {
				return !$.isEmptyObject(attrs.icon);
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

			scope.onClick = function () {
				confirmDialog(scope.title, scope.message, scope.yes, scope.yesTitle, scope.yesCallback, scope.no, scope.noTitle, scope.noCallback);
			}
		}
	};
}]);

app.directive('listButton', ['$parse', '$http', 'baseInput',
function($parse, $http, baseInput) {
	return {
		restrict : 'E',
        transclude: true,
        scope: {
        	'':'=',
            reset: '&',
            loadDependencies: '&',
            hasSelected: '&'
        },
		templateUrl : 'public/resources/components/list-button.html',
		link : function(scope, element, attrs, ngModelCtrl) {
			scope.newRegister = function(){
				scope.reset();
				scope.mode = "EDIT_MODE";
				console.log("newRegister");
				scope.loadDependencies();
			};

			scope.editRegister=function(){
				console.log("editRegister");
				if (!scope.hasSelected()) {
					//TODO error message
					return;
				}

				scope.reset();
				//TODO do get call
				scope.mode = "EDIT_MODE";
				this.loadDependencies();
			};

			scope.deleteRegister=function(){
				console.log("deleteRegister");
				if (!scope.hasSelected()) {
					//TODO error message
					return;
				}


				//TODO do delete call
			};
		}
	};
}]);

app.directive('panel', ['$parse', '$http', 'baseInput',
function($parse, $http, baseInput) {
	return {
		restrict : 'E',
        transclude: true,
        scope: {
        	'':'='
        },
		templateUrl : 'public/resources/components/panel.html',
		link : function(scope, element, attrs, ngModelCtrl) {
			scope.panelTitle = i18n(attrs.panelTitle);
			scope.panelClass = attrs.panelClass;
			scope.icon = attrs.icon;
			scope.hasIcon = function () {
				return !$.isEmptyObject(attrs.icon);
			}


		}
	};
}]);


app.directive('accordion', ['$parse', '$http', 'baseInput',
function($parse, $http, baseInput) {
	return {
		restrict : 'E',
        transclude: true,
        scope: {
        	'':'='
        },
		require : '?panelTitle',
		templateUrl : 'public/resources/components/accordion.html',
		link : function(scope, element, attrs, ngModelCtrl) {
			scope.panelTitle = i18n(attrs.panelTitle);
			scope.panelClass = attrs.panelClass;
			scope.icon = attrs.icon;
			scope.contentId = attrs.contentId;
			scope.linkId = "lk"+attrs.contentId;

			if ($.isEmptyObject(attrs.icon)) {
				scope.icon = "glyphicon glyphicon-chevron-down";
			}

		}
	};
}]);


app.directive('oi', ['$compile', '$parse', '$http', 'baseInput',
function($compile, $parse, $http, baseInput) {

	return {
		restrict : 'E',
        transclude: true, priority: 1,
        scope: {
        	list: '=',
        },
		templateUrl : 'public/resources/components/oi.html',
		link : function(scope, element, attrs, ctrl, transclude) {
			var tableHeader = $(element.children().children().children().children()[0]).children();
			var tableRow = $(element.children().children().children().children()[1]).children();

			var normalizeColumns = function (element){
				var value= $(element).html();

				var content = element.children();
				var result = "";

				for (var index = 0, size = content.length; index < size; index++) {
					var elemento = content[index];
					var itemValue = $(elemento).wrap('<p/>').parent().html();
					$(elemento).unwrap();
					result += "<td>"+itemValue+"</td>";

				}

				tableRow.append(result);
			}

			var appender = function(pointAppend, value){
				var valueAppend = value.replace(/<div/gi, "<td");
				pointAppend.append(valueAppend);
			}

			var buildTagTd = function(class){
				var td = "<td";
				if (!$.isEmptyObject(class)) {
					td += " class='"+class+"'";
				}
				td += ">";

				return td;
			}

			var addHeaderColumns = function(label, class){
				var tdStart = buildTagTd(class);

				var headerContent = "";
				if (!$.isEmptyObject(label)) {
					headerContent = i18n(label);
				}

				var tdEnd = "</td>";

				tableHeader.append(tdStart+headerContent+tdEnd);
			}


			var processColumn = function(content){
				for (var index = 0, size = content.length; index < size; index++) {
					var element = content[index];

					var label = $(element).attr('label');
					var class = $(element).attr('class');

					addHeaderColumns(label, class);
				}
			}

			transclude(scope, function (clone, childScope) {
				var headerContent = null;
				var bodyContent = null;
				for (var index = 0, size = clone.length; index < size; index++) {
					var element = clone[index];
					if (element.nodeName == "TABLE-HEADER") {
						headerContent = $(element);
					}

					if (element.nodeName == "TABLE-BODY") {
						bodyContent = $(element);
					}
				}

				if ($.isEmptyObject(headerContent)) {
					processColumn(bodyContent.children());
				}
				else {
					appender(tableHeader, $(headerContent).html());
				}
				normalizeColumns(bodyContent);

            });


			tableRow.attr("ng-repeat", "item in list");


			$compile(tableHeader)(scope);
			$compile(tableRow)(scope);


		}
	};
}]);




app.directive('dataTable', ['$parse', '$http', 'baseInput',
function($parse, $http, baseInput) {
	return {
		restrict : 'E',
        transclude: true,
        replace: true,
        scope: {
        	list: '=',
        },
		templateUrl : 'public/resources/components/data-table.html',
		link : function(scope, element, attrs) {
		/*	scope.headerComplete = false;
			scope.headers = [];

			scope.addHeader = function(newHeader){
				if (scope.headerComplete) {
					return;
				}

				for (var index = 0, size = scope.headers.length; index < size; index++) {
					var header = scope.headers[index];
					if (header.headerKey == newHeader.headerKey ) {
						scope.headerComplete = true;
						return;
					}
				}

				newHeader.label = i18n(newHeader.headerKey);
				scope.headers.push(newHeader);
			}

			scope.ping = function(){
				alert("oiaaaa");
			}*/

		}
	};
}]);


app.directive('column', ['$parse', '$http', 'baseInput',
function($parse, $http, baseInput) {
	return {
		restrict : 'E',
        transclude: true,
        scope: {
        	value:'=',
        	class:'=',
        },
		templateUrl : 'public/resources/components/column.html',
		link : function(scope, element, attrs, ngModelCtrl) {
			/*label
			columnField
			sortable
			class
			labelHint
			columnHint*/

		}
	};
}]);


