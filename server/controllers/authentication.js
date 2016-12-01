const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function (req, res, next) {
	//res.send({ success: true });
	const email = req.body.email;
	const pass = req.body.password;

	if (!email || !pass) {
		return res.status(422).send({ error: 'You must provide an email and password' });
	}

	//see if a user with a given email exists
	User.findOne({ email: email }, function (err, existingUser) {
		if (err) {
			return next(err);
		}

		//if a user with an email does exist, return an error
		if (existingUser) {
			return res.status(422).send({ error: 'Email is in use' });
		}

		//if a user with an email does NOT exist, create and save user record
		const user = new User({
			email: email,
			password: pass
		});

		user.save(function (error) {
			if (error) {
				return next(error);
			}

			//respond to request indicating the user was created
			res.json({ token: tokenForUser(user) });
		});
	});
};
