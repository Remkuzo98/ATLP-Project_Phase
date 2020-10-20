/* eslint-disable class-methods-use-this */
import { pick } from 'lodash';
import AuthTokenHelper from '../helpers/AuthTokenHelper';
import db from '../models';

const { User } = db;

export default new class loginController {
  async login(req, res) {
    const { email, password } = req.body;
    if (email === null) {
      return res.status(400).send({
        message: 'Email is Required',
      });
    }
    if (password === null) {
      return res.status(400).send({
        message: 'Password is Required',
      });
    }

    const currentUser = await User.findOne({
      where: { email },
    });
    if (!currentUser) {
      return res.status(400).send({
        message: 'User not exist',
      });
    }

    if (password === currentUser.password) {
      const displayData = pick(currentUser.dataValues, ['fullName', 'email', 'userName']);
      const authToken = AuthTokenHelper.generateToken(displayData);
      return res.status(200).send({
        userInfo: {
          message: 'User Logged in Successfully',
          displayData,
          AuthenticationToken: {
            authToken,
          },
        },
      });
    }

    return res.status(400).send({
      message: 'Incorrect password',
    });
  }
}();
