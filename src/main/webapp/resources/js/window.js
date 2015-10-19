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
