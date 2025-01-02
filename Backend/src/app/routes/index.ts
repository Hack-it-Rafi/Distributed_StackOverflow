import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { PostRoutes } from '../modules/post/post.route';
import { NotificationRoutes } from '../modules/notification/notification.router';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = Router();

const moduleRoutes = [
  
  {
    path: '/user',
    route: UserRoutes
  },
  {
    path: '/post',
    route: PostRoutes
  },
  {
    path: '/notification',
    route: NotificationRoutes
  },
  {
    path: '/auth',
    route: AuthRoutes
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;