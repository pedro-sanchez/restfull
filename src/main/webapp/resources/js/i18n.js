jQuery.i18n.properties({
    name:'messages',
    path:'/restfull/resources/bundle/',
    mode:'map',
    cache : true,
    language:'pt_BR',
});

var i18nArg = function(args) {
	if (!args) {
		return null;
	}
	var results = [];
	for (i = 0; i < args.length; i++) {
		results.push(jQuery.i18n.prop(args[i]));
	}

	return results;

};

var i18n = function(key, args) {
	var result = jQuery.i18n.prop(key, i18nArg(args));
	if (result == '[' + key + ']') {
		result = result.replace('[', '').replace(']', '');
	}
	return result;
};

jQuery.i18n.properties({
    name:'messages',
    path:'/restfull/resources/bundle/',
    mode:'map',
    cache : true,
    language:'pt_br',
});