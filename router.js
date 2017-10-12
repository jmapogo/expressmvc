var HomeController = require('./controllers/HomeController');
var LoginController = require('./controllers/LoginController');

// Routes
module.exports = function (app, handlebars) {

	// Main Routes

	app.get('/', function (req, res) {
		hbs = HomeController.MainLayout(handlebars);
		app.engine('handlebars', hbs.engine);
		HomeController.Index(req, res);
	});
	app.get('/other', HomeController.Other);
	app.get('/login/login', function (req, res) {

		hbs = LoginController.MainLayout(handlebars);
		app.engine('handlebars', hbs.engine);
		LoginController.Login(req, res);
	});
	app.get('/login/forgot', function (req, res) {
		hbs = LoginController.MainLayout(handlebars);
		app.engine('handlebars', hbs.engine);
		LoginController.Forgot(req, res);
	});
	app.get('/login/register', function (req, res) {
		hbs = LoginController.MainLayout(handlebars);
		app.engine('handlebars', hbs.engine);
		LoginController.Register(req, res);
	});

};
