/* eslint-disable class-methods-use-this */
import { pick } from 'lodash';
import db from '../models';
import AuthTokenHelper from '../helpers/AuthTokenHelper';

const { User } = db;

export default new class OAuthController {
  async googleLogin(req, res) {
    const { user } = req;
    const userData = {
      fullName: user.family_name + user.given_name,
      userName: user.displayName,
      email: user.email,
      password: null,
      socialId: user.id,
      provider: user.provider,
    };
    try {
      const newUser = await User.create(userData);
      if (!user) {
        throw new Error('An error occurred during register');
      }
      const displayData = pick(newUser.dataValues, ['fullName', 'email', 'userName', 'socialId', 'provider']);
      const authToken = AuthTokenHelper.generateToken(displayData);
      return res.status(200).send({
        status: 200,
        message: `${displayData.email} was logged in succesfully`,
        data: {
          userInfo: {
            displayData,
            AuthenticationToken: {
              authToken,
            },
          },
        },
      });
    } catch (e) {
      return res.status(400).send({
        status: 400,
        message: 'An error occured',
        error: {
          message: e.message,
        },
      });
    }
  }
}();
