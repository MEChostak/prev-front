require('dotenv').config();

// Imports **********************************************
var express = require('express')
const bodyParser = require('body-parser');

// App config **********************************************
var app = express();
var cookieParser = require('cookie-parser');
//var urlService = process.env.URLAPI;
var baseController = require('./controllers/BaseController');

app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes  **********************************************

// Login *********
app.get('/', function(req, res) {
	res.render('pages/login');
});

// Dashboard *********
app.get('/dashboard', function(req, res) {
	res.render('pages/dashboard');
    //baseController.renderPage(req, res, 'dashboard');
});

// Users *********
app.get('/user', function(req, res) {
	res.render('pages/userList');
    //baseController.renderPage(req, res, 'dashboard');
});
app.get('/user/edit', function(req, res) {
	res.render('pages/userEdit', { action : 'Create' });
    //baseController.renderPage(req, res, 'dashboard');
});
app.get('/user/create', function(req, res) {
	res.render('pages/userEdit', { action : 'Create' });
    //baseController.renderPage(req, res, 'dashboard');
});

// Organizations *********
app.get('/organization', function(req, res) {
	res.render('pages/organizationList');
    //baseController.renderPage(req, res, 'dashboard');
});
app.get('/organization/edit', function(req, res) {
	res.render('pages/organizationEdit', { action : 'Create' });
    //baseController.renderPage(req, res, 'dashboard');
});
app.get('/organization/create', function(req, res) {
	res.render('pages/organizationEdit', { action : 'Create' });
    //baseController.renderPage(req, res, 'dashboard');
});

// Tables *********
app.get('/table', function(req, res) {
	res.render('pages/tableList');
    //baseController.renderPage(req, res, 'dashboard');
});
app.get('/table/edit', function(req, res) {
	res.render('pages/tableEdit', { action : 'Create' });
    //baseController.renderPage(req, res, 'dashboard');
});

// Calc *********
app.get('/calc', function(req, res) {
	res.render('pages/calcList');
    //baseController.renderPage(req, res, 'dashboard');
});
app.get('/calc/create', function(req, res) {
	res.render('pages/calcEdit', { action : 'Create' });
    //baseController.renderPage(req, res, 'dashboard');
});

// Plan *********
app.get('/plan', function(req, res) {
	res.render('pages/planList');
    //baseController.renderPage(req, res, 'dashboard');
});
app.get('/plan/edit', function(req, res) {
	res.render('pages/planEdit', { action : 'Create' });
    //baseController.renderPage(req, res, 'dashboard');
});
app.get('/plan/create', function(req, res) {
	res.render('pages/planEdit', { action : 'Create' });
    //baseController.renderPage(req, res, 'dashboard');
});


// Profile *********
app.get('/profile', function(req, res) {
	res.render('pages/profileList');
    //baseController.renderPage(req, res, 'dashboard');
});
app.get('/profile/edit', function(req, res) {
	res.render('pages/profileEdit', { action : 'Create' });
    //baseController.renderPage(req, res, 'dashboard');
});
app.get('/profile/create', function(req, res) {
	res.render('pages/profileEdit', { action : 'Create' });
    //baseController.renderPage(req, res, 'dashboard');
});

// Start Application  **********************************************
app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});