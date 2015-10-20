function confirmDialog(title, message, yes, yesTitle, yesCallBack, no, noTitle, noCallBack) {

	bootbox.dialog({
		message : message,
		title : title,
		buttons : {
			success : {
				label : yes,
				title : yesTitle,
				className : "btn-success",
				callback : function() {
					if (yesCallBack) {
						yesCallBack();
					}
				}
			},
			danger : {
				label : no,
				title : noTitle,
				className : "btn-danger",
				callback : function() {
					if (noCallBack) {
						noCallBack();
					}
				}
			},

		}
	});
	return false;
}

function accordionToggle(element) {
	var lkId = element.id;
	var contentId = lkId.substring(2);


	var body = jQuery("#"+contentId);
	var i = jQuery("#lk"+contentId).children().children('i');

	if(body.hasClass( "in" )){
		i.removeClass("glyphicon glyphicon-chevron-down");
		i.addClass("glyphicon glyphicon-chevron-right");
	} else{
		i.removeClass("glyphicon glyphicon-chevron-right");
		i.addClass("glyphicon glyphicon-chevron-down");
	}
	body.collapse('toggle');
}
