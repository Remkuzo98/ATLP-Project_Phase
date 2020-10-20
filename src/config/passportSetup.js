import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2';
import 'dotenv/config';

passport.use('google', new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/google/redirect',
  },
  (accessToken, refreshToken, profile, done) => {
    done(null, profile);
  },
));
