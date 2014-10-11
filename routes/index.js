var jiraHelper = require('../utility/jira-helper');
var mailHelper = require('../utility/mail-helper')
var router = require('express').Router();

router.get('/', function (req, res) {

	res.render('index', {
		logined: !!req.session.logined
	});
});

router.post('/login', function (req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
		jiraHelper.login(username, password).then(function (logined) {
			req.session.logined = logined;
			res.json({
				success: logined
			});
		});
	} else {
		res.json({
			success: false
		});
	}
});

router.post('/release/get', function (req, res) {
	var fixversion = req.body.fixversion;
	if (fixversion) {
		jiraHelper.getReleaseList(fixversion).then(function (data) {
			res.json(data);
		});
	} else {
		res.json({
			items: null
		});
	}
});

router.get('/issue/:id', function (req, res) {
	jiraHelper.issue(req.params.id).then(function (issue) {
		res.json(issue);
	});
});

router.post('/release/export', function (req, res) {
	jiraHelper.getCurrentUser().then(function (user) {
		if (user.success) {
			mailHelper.mail(user.data.emailAddress,
				req.body.subject,
				req.body.mainbody
			).then(function (status) {
					res.json(status);
				});
		} else {
			res.json({
				success: false
			})
		}
	});
});

module.exports = router;
