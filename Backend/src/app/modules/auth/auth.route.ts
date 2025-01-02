import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { UserValidation } from '../user/user.validation';
import { UserControllers } from '../user/user.controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/signup',
  validateRequest(UserValidation.addUserSchema),
  UserControllers.createUser,
);


export const AuthRoutes = router;
