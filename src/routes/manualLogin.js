import express from 'express';

import loginController from '../controllers/loginController';

const loginRouter = express.Router();

loginRouter.post('/api/v1/login', loginController.login);

export default loginRouter;
