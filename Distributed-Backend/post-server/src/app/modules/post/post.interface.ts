import { Types } from 'mongoose';

export type TPost = {
  headLine: string;
  content: string;
  fileUrl: string;
  //   status: 'processing' | 'finished';
  userEmail: string;
  userName: string;
  userId: Types.ObjectId;
};
