import express from 'express';
import multer from 'multer';
import validateRequest from '../../middlewares/validateRequest';
import { PostControllers } from './post.controller';
import { PostValidations } from './post.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

// Use memory storage to avoid saving the file permanently
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  '/create-Post',
  auth(),
  upload.single('file'), // Specify the field name to be 'file'
  validateRequest(PostValidations.createPostValidationSchema),
  PostControllers.createPost,
);

router.get('/:id',auth(), PostControllers.getSinglePost);
router.get('/',auth(), PostControllers.getAllPosts);
router.get('/file/:fileName',auth(), PostControllers.getPostFile);

export const PostRoutes = router;
