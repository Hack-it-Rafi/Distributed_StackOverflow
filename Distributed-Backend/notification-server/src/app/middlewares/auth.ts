import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import axios from 'axios';

// const auth = (...requiredRoles: TUserRole[]) => {
const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    const apiKey = req.headers['x-api-key'];

    // console.log("API key in Notification",apiKey);

    if (apiKey && apiKey === config.NOTIFICATION_SERVICE_API_KEY) {
      return next();
    }

    if (!token) {
      throw new AppError(401, 'You are not authorized!');
    }

    try {
      const decoded = jwt.verify(
        token,
        config.JWT_ACCESS_SECRET as string,
      ) as JwtPayload;

      const { userEmail } = decoded;
      // console.log("decoded",decoded);
      // console.log("mail",userEmail);


      const userServiceUrl = `http://user-service/api/v1/user?email=${userEmail}`;
      const userResponse = await axios.get(userServiceUrl, {
        headers: {
          'x-api-key': config.USER_SERVICE_API_KEY,
          'Content-Type': 'application/json',
        }
      });
      const user = userResponse.data.data[0];
      // console.log("user",user);

      if (!user) {
        throw new AppError(401, 'User not found!');
      }

      req.user = user;

      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new AppError(
          403,
          'Token expired. Please log in again.',
        );
      }
      throw new AppError(401, 'Invalid token.');
    }
  });
};

export default auth;
