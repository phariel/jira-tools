var nodemailer = require('nodemailer');
var when = require('when');
var transporter = nodemailer.createTransport({
	host: 'smtp.163.com',
	port: 25,
	auth: {
		user: 'philmailserver@163.com',
		pass: 'mailserver'
	}
});

exports.mail = function (mailto, subject, body) {
	return when.promise(function (resolve) {
		transporter.sendMail({
			from: 'GL Reminder <philmailserver@163.com>',
			to: mailto,
			subject: subject,
			text: 'GL Reminder',
			html: decodeURIComponent(body)
		}, function (err, data) {
			console.log('Mail Sending Error: ');
			console.log(err);
			resolve({
				success: !err,
				emailAddress: mailto
			});
		});
	});
};

