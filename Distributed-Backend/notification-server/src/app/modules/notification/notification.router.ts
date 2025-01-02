import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
// import auth from '../../middlewares/auth';
import { NotificationValidations } from './notification.validation';
import { NotificationControllers } from './notification.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-Notification',
  auth(),
  validateRequest(NotificationValidations.createNotificationValidationSchema),
  NotificationControllers.createNotification,
);

router.get('/:id',auth(), NotificationControllers.getSingleNotification);

router.patch(
  '/:id',
  auth(),
  validateRequest(NotificationValidations.updateNotificationValidationSchema),
  NotificationControllers.updateNotification,
);

// router.delete('/:id', auth('admin'), NotificationControllers.deleteNotification);


router.get('/', auth(), NotificationControllers.getAllNotifications);

export const NotificationRoutes = router;