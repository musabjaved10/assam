const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../database/mySQL')

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        // console.log(email, password)
        try {
            await findUserByEmail(email).then(async (user) => {

                if (!user) {
                    return done(null, false, req.flash("error", `Email ${email} doesn't exist`));
                }
                if (user) {
                    // console.log('heyyy its a user', user)
                    let match = await comparePassword(password, user);

                    if (match === true) {
                        // console.log('matching done here is the user >', user)
                        return done(null, user, null)
                    } else {
                        return done(null, false, req.flash("error", match))
                    }
                }
            });
        } catch (err) {
            console.log(err);
            return done(null, false);
        }
    }));


let findUserByEmail = (email) => {
    console.log('printing email from userbyEMAIL func ' + email)

    return new Promise((resolve, reject) => {
        try {
            const sql = ' SELECT * FROM admin_user WHERE email = ? '
            db.query(sql, email, function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    // console.log(rows )
                    let user = rows[0];
                    // console.log(user)
                    resolve(user);
                }
            );
        } catch (err) {
            console.log('error from findUserByEmail catch')
            reject(err);
        }
    });
};


let findUserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(' SELECT * FROM admin_user WHERE id = ?  ', id, function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    console.log('inside find user by id')
                    let user = rows[0];
                    // console.log('printing user from FINDUSERBYID')
                    // console.log(user)
                    resolve(user);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let comparePassword = (password, userObject) => {
    // console.log(`reached in compare password and the password is ${password}`)
    // console.log(password, userObject)
    return new Promise(async (resolve, reject) => {
        try {
            await bcrypt.compare(password, userObject.password).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    resolve(`Incorrect Password`);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

passport.serializeUser((user, done) => {
    console.log(`Inside Serializing user:>`)
    // console.log(user)
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log(`Inside DESerializing user:>`)
    findUserById(id).then((user) => {
        // console.log('printing userr****************')
        // console.log(user)
        return done(null, user);
    }).catch(error => {
        return done(error, null)
    });
})

module.exports = passport