import express from 'express';
import passport from 'passport';
import OAuthController from '../controllers/0auth';
import { OAuth } from '../middleware';

const socialLoginRouter = express.Router();

socialLoginRouter.get('/login/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

socialLoginRouter.get('/auth/google/redirect', passport.authenticate('google', { session: false }), OAuth.googleAuth, OAuthController.googleLogin);

export default socialLoginRouter;
