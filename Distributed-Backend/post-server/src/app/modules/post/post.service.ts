// import mongoose from 'mongoose';
// import QueryBuilder from '../../builder/QueryBuilder';
// import { PostSearchableFields } from './post.constant';
// import { TPost } from './post.interface';
// import { Post } from './post.model';
// import AppError from '../../errors/AppError';
// import axios from 'axios';

// const createPostIntoDB = async (payload: TPost) => {
//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     const result = await Post.create([payload], {
//       session,
//     });

//     if (!result) {
//       throw new AppError(400, 'Failed to create post');
//     }

//     if (result) {
//       //
//       const notificationPayload = {
//         headLine: payload.headLine,
//         postId: result[0]._id,
//       };

//       const response = await axios.post(
//         'http://localhost:5003/api/v1/notification/create-Notification', 
//         notificationPayload,
//         {
//           headers: {
//             'x-api-key': process.env.NOTIFICATION_SERVICE_API_KEY,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.status !== 201) {
//         throw new AppError(400, 'Failed to create notification');
//       }

//       // const createNotification = await Notification.create([
//       //   {
//       //     headLine: payload.headLine,
//       //     postId: result[0]._id,
//       //   },
//       // ]);

//       // if (!createNotification) {
//       //   throw new AppError(400, 'Failed to create notification');
//       // }
//     }

//     await session.commitTransaction();
//     await session.endSession();

//     return result[0];
//   } catch (err) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new AppError(400, 'Failed to create post');
//   }
// };

// const getAllPostsFromDB = async (query: Record<string, unknown>) => {
//   const postQuery = new QueryBuilder(Post.find().populate('userId'), query)
//     .search(PostSearchableFields)
//     .filter()
//     .sort()
//     .paginate()
//     .fields();

//   const result = await postQuery.modelQuery;
//   return result;
// };

// const getSinglePostFromDB = async (id: string) => {
//   const result = await Post.findById(id).populate('userId');
//   return result;
// };

// export const PostServices = {
//   createPostIntoDB,
//   getAllPostsFromDB,
//   getSinglePostFromDB,
// };


import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { PostSearchableFields } from './post.constant';
import { TPost } from './post.interface';
import { Post } from './post.model';
import AppError from '../../errors/AppError';
import axios from 'axios';
import config from '../../config';

const fetchUserDetails = async (userId: string) => {
  try {
    const response = await axios.get(
      `http://user-service:5001/api/v1/user/${userId}`,
      {
        headers: {
          'x-api-key': config.USER_SERVICE_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.data;
  } catch {
    throw new Error('Failed to fetch user details');
  }
};

const createPostIntoDB = async (payload: TPost) => {
  const session = await mongoose.startSession();

  try {
    // session.startTransaction();

    const result = await Post.create([payload], { session });

    if (!result) {
      throw new AppError(400, 'Failed to create post before creating notification');
    }

    if (result) {
      const notificationPayload = {
        headLine: payload.headLine,
        postId: result[0]._id,
      };

      const response = await axios.post(
        'http://notification-service:5003/api/v1/notification/create-Notification',
        notificationPayload,
        {
          headers: {
            'x-api-key': process.env.NOTIFICATION_SERVICE_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status !== 200) {
        throw new AppError(400, 'Failed to create notification');
      }
    }

    // await session.commitTransaction();
    // await session.endSession();

    return result[0];
  } catch (err) {
    // await session.abortTransaction();
    // await session.endSession();
    throw new AppError(400, err instanceof Error ? err.message : 'Unknown error');
  }
};

const getAllPostsFromDB = async (query: Record<string, unknown>) => {
  const postQuery = new QueryBuilder(Post.find(), query)
    .search(PostSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const posts = await postQuery.modelQuery;

  // Replace userId with user details for each post
  const postsWithUsers = await Promise.all(
    posts.map(async (post) => {
      const userDetails = await fetchUserDetails(post.userId.toString());
      return { ...post.toObject(), userId: userDetails };
    })
  );

  return postsWithUsers;
};

const getSinglePostFromDB = async (id: string) => {
  const post = await Post.findById(id);
  if (!post) throw new Error('Post not found');

  const userDetails = await fetchUserDetails(post.userId.toString());
  return { ...post.toObject(), userId: userDetails };
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  getSinglePostFromDB,
};
