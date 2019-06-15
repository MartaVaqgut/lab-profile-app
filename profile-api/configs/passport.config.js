const User = require('../models/user.model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('auth-local', new LocalStrategy({
    usernameField: 'email',
    passportField: 'password'
},(email, password, next) => {
    User.findOne({ email: email })
        .then (user => {
            if (!user) {
                next(null, false, 'Invalid email or password')
            }else {
                return user.checkPassword(password)
                .then (match=> {
                    if (!match) {
                        next(null, false, 'Invalid email or password')
                    } else{
                        next(null, user)
                    }
                })
            }
        }).catch (error => next(error))
}));