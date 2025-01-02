import { Router } from 'express';
import { NotificationRoutes } from '../modules/notification/notification.router';

const router = Router();

const moduleRoutes = [
  
  {
    path: '/notification',
    route: NotificationRoutes
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;