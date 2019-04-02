function change_a_href() {
	var domain = window.location.host;
	var protocol = window.location.protocol;
	$('#blog_back_btn').attr('href', protocol + '//' + domain);
}
