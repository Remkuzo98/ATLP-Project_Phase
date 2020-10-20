/* eslint-disable consistent-return */
import { pick } from 'lodash';
import AuthTokenHelper from '../../helpers/AuthTokenHelper';
import db from '../../models';

const { User } = db;

const googleAuth = async (req, res, next) => {
  const { emails, displayName } = req.user;
  const currentUser = await User.findOne({
    where: { email: emails[0].value },
  });
  if (currentUser !== null) {
    const displayData = pick(currentUser.dataValues, ['fullName', 'email', 'userName', 'socialId', 'provider']);
    const authToken = AuthTokenHelper.generateToken(displayData);
    const { socialId, userName, email } = displayData;
    return res.status(200).send({
      status: 200,
      message: `${displayName} was succesfully logged in`,
      data: {
        userInfo: {
          socialId,
          userName,
          email,
          AuthenticationToken: {
            authToken,
          },
        },
      },
    });
  }
  next();
};

export default googleAuth;
