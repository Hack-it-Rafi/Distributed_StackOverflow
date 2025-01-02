import { model, Schema } from 'mongoose';
import { TPost } from './post.interface';

const postSchema = new Schema<TPost>(
  {
    headLine: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    fileUrl: {
      type: String,
      trim: true,
    },
    userEmail: {
      type: String,
      trim: true,
      required: true,
    },
    userName: {
      type: String,
      trim: true,
      required: true,
    },
    // status: {
    //   type: String,
    //   enum: ['processing', 'finished'],
    //   default: 'processing',
    // },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Post = model<TPost>('Post', postSchema);
