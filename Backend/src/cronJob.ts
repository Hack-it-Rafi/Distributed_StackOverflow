import cron from 'node-cron';
import { Notification } from './app/modules/notification/notification.model';

cron.schedule('* * * * *', async () => {
// midnight (00:00)
// cron.schedule('0 0 * * *', async () => {
  try {
    const cutoffDate = new Date();
    // cutoffDate.setDate(cutoffDate.getDate() - 15);
    cutoffDate.setMinutes(cutoffDate.getMinutes() - 5);

     await Notification.updateMany(
      { createdAt: { $lt: cutoffDate } },
      { isDeleted: true }
    );

    // console.log(`${result.modifiedCount} notifications marked as deleted.`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error updating notifications:', error);
  }
});
