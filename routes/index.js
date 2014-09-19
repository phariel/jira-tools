var jiraHelper = require('../utility/jira-helper');
var router = require('express').Router();

router.get('/', function (req, res) {

	res.render('index', {
		logined: !!req.session.user
	});
});

router.post('/login', function (req, res) {
	console.log(req.body);
	res.json({
		'success': 'true'
	});
});

router.get('/issue/:id', function (req, res) {
	jiraHelper.issue(req.params.id).then(function (issue) {
		res.json(issue);
	});
});

module.exports = router;
