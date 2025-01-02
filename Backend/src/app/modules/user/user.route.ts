import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-User',
  // auth(),
  validateRequest(UserValidation.addUserSchema),
  UserControllers.createUser,
);

router.get(
  '/:id',
  auth(),
  UserControllers.getSingleUser,
);

router.get(
  '/',
  auth(),
  UserControllers.getAllUsers,
);

// router.patch(
//   '/:userId',
//   auth('admin'),
//   validateRequest(UserValidation.updateUserSchema),
//   UserControllers.updateUser,
// );

// router.delete(
//   '/:userId',
//    auth('admin'),
//   UserControllers.deleteUser,
// );

export const UserRoutes = router;
