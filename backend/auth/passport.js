const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/User');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const u = await User.findById(id);
  done(null, u);
});

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK_URL,
}, async (token, tokenSecret, profile, done) => {
  try {
    let user = await User.findOne({ 'twitter.id': profile.id });
    if (!user) user = new User();
    user.twitter = { id: profile.id, token, tokenSecret };
    await user.save();
    done(null, user);
  } catch (e) { done(e); }
}));

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: process.env.LINKEDIN_CALLBACK_URL,
  scope: ['r_liteprofile', 'w_member_social'],
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ 'linkedin.id': profile.id });
    if (!user) user = new User();
    user.linkedin = { id: profile.id, accessToken };
    await user.save();
    done(null, user);
  } catch (e) { done(e); }
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['id', 'displayName', 'photos', 'email'] // Customize as needed
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ 'facebook.id': profile.id });
    if (!user) user = new User();
    user.facebook = {
      id: profile.id,
      accessToken,
      name: profile.displayName,
      email: profile.emails?.[0]?.value || null,
      photo: profile.photos?.[0]?.value || null
    };
    await user.save();
    done(null, user);
  } catch (e) {
    done(e);
  }
}));


module.exports = passport;
