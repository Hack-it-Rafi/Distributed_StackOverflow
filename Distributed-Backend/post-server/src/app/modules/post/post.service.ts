import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { PostSearchableFields } from './post.constant';
import { TPost } from './post.interface';
import { Post } from './post.model';
import AppError from '../../errors/AppError';
import { Notification } from '../notification/notification.model';

const createPostIntoDB = async (payload: TPost) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await Post.create([payload], {
      session,
    });

    if (!result) {
      throw new AppError(400, 'Failed to create post');
    }

    if (result) {
      const createNotification = await Notification.create([
        {
          headLine: payload.headLine,
          postId: result[0]._id,
        },
      ]);

      if (!createNotification) {
        throw new AppError(400, 'Failed to create notification');
      }
    }

    await session.commitTransaction();
    await session.endSession();

    return result[0];
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Failed to create post');
  }
};

const getAllPostsFromDB = async (query: Record<string, unknown>) => {
  const postQuery = new QueryBuilder(Post.find().populate('userId'), query)
    .search(PostSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await postQuery.modelQuery;
  return result;
};

const getSinglePostFromDB = async (id: string) => {
  const result = await Post.findById(id).populate('userId');
  return result;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  getSinglePostFromDB,
};
