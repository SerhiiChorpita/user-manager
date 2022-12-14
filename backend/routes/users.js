const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');

// Validate an existing user and issue a JWT
router.post('/login', function (req, res, next) {

    User.findOne({ email: req.body.email })
        .then((user) => {

            if (!user) {
                return res.status(401).json({ success: false, msg: "could not find user" });
            }

            // Function defined at bottom of app.js
            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

            if (isValid) {

                const tokenObject = utils.issueJWT(user);

                res.status(200).json({ success: true, user: req.body.email, token: tokenObject.token, expiresIn: tokenObject.expires });

            } else {

                res.status(401).json({ success: false, msg: "you entered the wrong password" });

            }

        })
        .catch((err) => {
            next(err);
        });
});

// Register a new user
router.post('/register', function (req, res, next) {
    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        userName: req.body.userName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        rights: req.body.rights,
        hash: hash,
        salt: salt,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
    });

    try {

        newUser.save()
            .then((user) => {

                const jwt = utils.issueJWT(user);

                res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires });
            });

    } catch (err) {

        res.json({ success: false, msg: err });

    }

});

module.exports = router;