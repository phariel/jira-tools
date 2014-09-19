var when = require('when');
var jiraLib = require('jira');

var jira;

var jiraHelper = {
	init: function (acctemp, passtemp) {
		var JiraApi = jiraLib.JiraApi;
		jira = new JiraApi('https', 'jira.englishtown.com', 443, acctemp, passtemp, '2');
	},
	issue: function (id) {
		return when.promise(function (resolve) {
			jira.findIssue(id, function (err, issue) {
				if (err) {
					resolve('some error occurred');
				} else {
					resolve(JSON.stringify(issue));
				}
			});
		});
	}
};

module.exports = jiraHelper;
