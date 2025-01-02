import QueryBuilder from '../../builder/QueryBuilder';
import { NotificationSearchableFields } from './notification.constant';
import { TNotification } from './notification.interface';
import { Notification } from './notification.model';


const createNotificationIntoDB = async (payload: TNotification) => {
  const result = await Notification.create(payload);
  return result;
};

const getAllNotificationsFromDB = async (query: Record<string, unknown>) => {
  const notificationQuery = new QueryBuilder(
    Notification.find()
      .populate('postId'),
    query,
  )
    .search(NotificationSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await notificationQuery.modelQuery;
  return result;
};

const getSingleNotificationFromDB = async (id: string) => {
  const result = await Notification.findById(id).populate('postId');
  return result;
};

const updateNotificationInDB = async (id: string, payload: Partial<TNotification>) => {
  const result = await Notification.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// const deleteNotificationFromDB = async (id: string) => {
//   const result = await Notification.findByIdAndDelete(id);
//   return result;
// };

export const NotificationServices = {
  createNotificationIntoDB,
  getAllNotificationsFromDB,
  getSingleNotificationFromDB,
  updateNotificationInDB,
//   deleteNotificationFromDB,
};
