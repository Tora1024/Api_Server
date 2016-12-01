const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup options for JWT Strategy
const jwtOptions = {};

// Create JWT strategy
const jwtlogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// Payload is the decoded JWT token, with a sub property and issued time property.
	// Done is a callback function to see if an user was or wasnt successfully authenticated.

	// We wnt to see if the User ID in the payload exists in our database
	// If it does, call 'done' with that ID
	// otherwise, call done without the user object
	User.finById(payload.sub, function(err, user){
		if (err) {
			return done(err, false);
		}

		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

// Tell passport to use this strategy
