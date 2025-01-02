import { Router } from 'express';
import { PostRoutes } from '../modules/post/post.route';

const router = Router();

const moduleRoutes = [
  
  {
    path: '/post',
    route: PostRoutes
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;