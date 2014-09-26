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
	},
	login: function (username, password) {
		this.init(username, password);
		return when.promise(function (resolve) {
			jira.getCurrentUser(function (err) {
				resolve(!err);
			});
		});
	},
	getReleaseList: function (fixversion) {
		return when.promise(function (resolve) {
			jira.searchJira(
					'project in (SPC, SD) AND fixVersion = "' + fixversion + '"',
				['issuekey', 'summary', 'assignee', 'reporter', 'priority', 'status'],
				function (err, data) {
					resolve({
						success: !err,
						items: data
					});
				});
		});
	}
};

module.exports = jiraHelper;
