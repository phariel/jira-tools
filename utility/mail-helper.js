var nodemailer = require('nodemailer');
var when = require('when');

var transporter = nodemailer.createTransport({
	service: 'Yahoo',
	auth: {
		user: 'philmailserver@yahoo.com',
		pass: 'ocmirjhirldzcdgu'
	}
});

exports.mail = function (mailto, subject, body) {
	return when.promise(function (resolve) {
		transporter.sendMail({
			from: 'GL Reminder <philmailserver@yahoo.com>',
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

