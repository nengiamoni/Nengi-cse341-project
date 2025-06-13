const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');


// Local strategy
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return done(null, false, { message: 'Invalid credentials' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, _, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value;
    const googleId = profile.id;

    if (!email || !googleId) {
      return done(null, false, { message: 'Missing profile info from Google' });
    }

    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.create({
        username: email,
        googleId: googleId
      });
    }

    done(null, user);
  } catch (err) {
    done(err);
  }
}));

// Session handling (optional for JWT-based apps, still useful for Passport)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
