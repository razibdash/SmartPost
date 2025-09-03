const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

router.get('/auth/linkedin', passport.authenticate('linkedin'));

router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

module.exports = router;
