import jwt from 'jsonwebtoken';
import { Schema } from 'mongoose';

export const createToken = (
  jwtPayload: { userId: Schema.Types.ObjectId, userName: string, userEmail: string, userImage:string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
