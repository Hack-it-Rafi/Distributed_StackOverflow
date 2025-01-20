// import QueryBuilder from '../../builder/QueryBuilder';
// import { NotificationSearchableFields } from './notification.constant';
// import { TNotification } from './notification.interface';
// import { Notification } from './notification.model';


// const createNotificationIntoDB = async (payload: TNotification) => {
//   const result = await Notification.create(payload);
//   return result;
// };

// const getAllNotificationsFromDB = async (query: Record<string, unknown>) => {
//   const notificationQuery = new QueryBuilder(
//     Notification.find()
//       .populate('postId'),
//     query,
//   )
//     .search(NotificationSearchableFields)
//     .filter()
//     .sort()
//     .paginate()
//     .fields();

//   const result = await notificationQuery.modelQuery;
//   return result;
// };

// const getSingleNotificationFromDB = async (id: string) => {
//   const result = await Notification.findById(id).populate('postId');
//   return result;
// };

// const updateNotificationInDB = async (id: string, payload: Partial<TNotification>) => {
//   const result = await Notification.findByIdAndUpdate(id, payload, {
//     new: true,
//     runValidators: true,
//   });
//   return result;
// };

// // const deleteNotificationFromDB = async (id: string) => {
// //   const result = await Notification.findByIdAndDelete(id);
// //   return result;
// // };

// export const NotificationServices = {
//   createNotificationIntoDB,
//   getAllNotificationsFromDB,
//   getSingleNotificationFromDB,
//   updateNotificationInDB,
// //   deleteNotificationFromDB,
// };


import axios from 'axios';
import QueryBuilder from '../../builder/QueryBuilder';
import { NotificationSearchableFields } from './notification.constant';
import { TNotification } from './notification.interface';
import { Notification } from './notification.model';
import config from '../../config';

const fetchPostDetails = async (postId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5002/api/v1/post/${postId}`,
      {
        headers: {
          'x-api-key': config.POST_SERVICE_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch {
    throw new Error('Failed to fetch post details');
  }
};

const createNotificationIntoDB = async (payload: TNotification) => {
  const result = await Notification.create(payload);
  return result;
};

const getAllNotificationsFromDB = async (query: Record<string, unknown>) => {
  const notificationQuery = new QueryBuilder(
    Notification.find(),
    query,
  )
    .search(NotificationSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const notifications = await notificationQuery.modelQuery;

  // Add Post details to each notification by replacing postId with postDetails
  const notificationsWithPosts = await Promise.all(
    notifications.map(async (notification) => {
      const postDetails = await fetchPostDetails(notification.postId.toString());
      return { ...notification.toObject(), postId: postDetails.data };
    })
  );

  return notificationsWithPosts;
};

const getSingleNotificationFromDB = async (id: string) => {
  const notification = await Notification.findById(id);
  if (!notification) throw new Error('Notification not found');

  const postDetails = await fetchPostDetails(notification.postId.toString());
  return { ...notification.toObject(), postId: postDetails.data };
};

const updateNotificationInDB = async (id: string, payload: Partial<TNotification>) => {
  const result = await Notification.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const NotificationServices = {
  createNotificationIntoDB,
  getAllNotificationsFromDB,
  getSingleNotificationFromDB,
  updateNotificationInDB,
};
