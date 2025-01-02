import { model, Schema } from 'mongoose';
import { TNotification } from './notification.interface';


const notificationSchema = new Schema<TNotification>(
  {
    headLine: {
      type: String,
      trim: true,
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      trim: true,
      required: true,
    },
    seenUser: [
      {
        type: String, 
        trim: true,
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Notification = model<TNotification>('Notification', notificationSchema);
