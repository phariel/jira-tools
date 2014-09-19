var jiraHelper = require('../utility/jira-helper');
var router = require('express').Router();

router.get('/', function (req, res) {
	console.log(req.params);
	res.json(JSON.stringify(req));
});

module.exports = router;