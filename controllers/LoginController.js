exports.Login = function (request, response) {
	response.pageInfo = {};
	response.pageInfo.title = 'Login';
	response.render('login/Login', response.pageInfo);
};
exports.Forgot = function (request, response) {
	response.pageInfo = {};
	response.pageInfo.title = 'Forgot Password';
	response.render('login/Forgot', response.pageInfo);
};
exports.Register = function (request, response) {
	response.pageInfo = {};
	response.pageInfo.title = 'Register Account';
	response.render('login/Register', response.pageInfo);
};
exports.MainLayout  = function (handlebars) { 
	var hbs = handlebars.create({
			defaultLayout: 'LoginShell'
		});

	return hbs;
};
