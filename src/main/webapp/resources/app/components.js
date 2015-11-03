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

app.service('baseGrid', [ function() {
	var baseGrid = {};

	baseGrid.configure = function(tableHeader, tableRow, $compile, scope, element, attrs, ctrl, transclude){


		var normalizeColumns = function (element){
			var value= $(element).html();

			var content = element.children();
			var result = "";

			for (var index = 0, size = content.length; index < size; index++) {
				var elemento = content[index];
				var disabledValue = $(elemento).attr('ng-disabled');

				if ($.isEmptyObject(disabledValue)) {
					disabledValue = "";
				}

				disabledValue += " !item.editing";

				$(elemento).attr('ng-disabled', disabledValue);

				var itemValue = $(elemento).wrap('<p/>').parent().html();
				$(elemento).unwrap();

				itemValue = itemValue.replace("form-group", "");

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
				$(content[index]).removeAttr('label');

				var class = $(element).attr('class');

				addHeaderColumns(label, class);

				var classes = class.split(" ");

				var newClass = "";
				for (var idx = 0, cssSize = classes.length; idx < cssSize; idx++) {
					var cssClass = classes[idx];

					if (!(cssClass.startsWith('col-xs') || cssClass.startsWith('col-sm') || cssClass.startsWith('col-md') || cssClass.startsWith('col-lg'))) {
						newClass += cssClass + " ";
					}

				}

				$(element).attr('class', newClass);
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
	};

	return baseGrid;
}]);

app.directive('grid', ['$compile', '$parse', '$http', 'baseGrid',
function($compile, $parse, $http, baseGrid) {

	return {
		restrict : 'E',
        transclude: true, priority: 1,
        scope: {
        	list: '=',
        },
		templateUrl : 'public/resources/components/data-table.html',
		link : function(scope, element, attrs, ctrl, transclude) {
			var tableHeader = $(element.children().children().children().children()[0]).children();
			var tableRow = $(element.children().children().children().children()[1]).children();

			baseGrid.configure(tableHeader, tableRow, $compile, scope, element, attrs, ctrl, transclude);
		}
	};
}]);


app.directive('gridEdit', ['$compile', '$parse', '$http', 'baseGrid',
function($compile, $parse, $http, baseGrid) {

	return {
		restrict : 'E',
        transclude: true, priority: 1,
        scope: {
        	list:"=",
        	masterValue:"=",
        	setData: '&',
        	loadDependencies: '&',
        	saveData: '&',
        	removeData: '&',
        },
		templateUrl : 'public/resources/components/grid-edit.html',
		link : function(scope, element, attrs, ctrl, transclude) {

			scope.panelTitle = i18n(attrs.panelTitle);
			scope.panelClass = attrs.panelClass;
			scope.icon = attrs.icon;
			scope.contentId = attrs.contentId;
			scope.linkId = "lk"+attrs.contentId;

			if ($.isEmptyObject(attrs.icon)) {
				scope.icon = "glyphicon glyphicon-chevron-down";
			}

			var initalizeList = function(){
				if ($.isEmptyObject(scope.list) || scope.list.length<=0){
					scope.list=[];
					return;
				}

				for (var i = 0, size = scope.list.length; i < size; i++) {
					var itemValue = scope.list[i];
					itemValue.editing = false;
				}
			}


			if (!$.isEmptyObject(attrs.list)){
				initalizeList();
			}
			else if (!$.isEmptyObject(attrs.baseUrl) && !$.isEmptyObject(attrs.masterField) && !$.isEmptyObject(scope.masterValue)) {
				var urlList = attrs.baseUrl + "list/"+ attrs.masterField + "/" + scope.masterValue.id;

				$http.get(urlList).success(function(result) {
					scope.list = result;
					initalizeList();
				});
			}

			scope.editMode = false;

			var setMasterValues = function(object){
				if (!$.isEmptyObject(scope.setData)) {
					scope.setData(object);
				}
				else if (!$.isEmptyObject(attrs.masterField) && !$.isEmptyObject(scope.masterValue)) {
					object[attrs.masterField] = scope.masterValue;
				}
			}

			scope.newItem = function(){
				var object = {notPersisted:true};
				setMasterValues(object);

				scope.edit(object);

				scope.list.push(object);

			}

			scope.edit = function(object){
				scope.editMode = true;
				object.editing = true;

				if (!$.isEmptyObject(scope.loadDependencies)) {
					scope.loadDependencies(scope, object);
				}

			}

			scope.save = function(object){
				scope.editMode = false;
				object.editing = false;

				delete object["notPersisted"];
				delete object["editing"];

				if (!$.isEmptyObject(scope.saveData)) {
					scope.saveData(object);
				}
				else if (!$.isEmptyObject(attrs.baseUrl)) {
					var urlSave = attrs.baseUrl;

					$http.post(urlSave, object).success(function(result) {
						$.extend( object, result );

						console.log("message savesucess");
					});
				}


			}
			scope.cancel = function(object){
				scope.editMode = false;
				object.editing = false;

				if (object.notPersisted) {
					if (scope.list.length > 0) {
						var lastIndex =scope.list.length - 1;
						scope.list.splice(lastIndex, 1);
					}
				}

			}

			scope.remove = function(object){
				if (!$.isEmptyObject(scope.removeData)) {
					scope.removeData(object);
					removeGrid(object);
				}
				else{
					removeGrid(object);
				}
			}

			var findIndex = function(object) {
				for (var i = 0; i < scope.list.length; i++) {
					if (object.id == scope.list[i].id) {
						return i;
					}
				}
			}

			var removeGrid = function(object) {
				var index = findIndex(object)

				if (index >= 0) {
					scope.list.splice(index, 1);
				}
			};

			var base = $(element.children().children()[1]).children().children().children().children().children();

			var tableHeader = $(base[0]).children();
			var tableRow = $(base[1]).children();

			baseGrid.configure(tableHeader, tableRow, $compile, scope, element, attrs, ctrl, transclude);
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
			value
			sortable
			class
			labelHint
			columnHint*/

		}
	};
}]);


