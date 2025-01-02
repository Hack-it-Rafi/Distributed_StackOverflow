import { Types } from 'mongoose';


export type TSeenUser = {
  userId: string;
};


export type TNotification = {
  headLine: string;
  //   status: 'processing' | 'finished';
  isDeleted: boolean;
  postId: Types.ObjectId;
  seenUser: [TSeenUser];
};
