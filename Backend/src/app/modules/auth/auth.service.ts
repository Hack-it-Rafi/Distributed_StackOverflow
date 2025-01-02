import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(payload.email);
  // console.log(user);
  if (!user) {
    throw new AppError(404, 'This user is not found !');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(403, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    userId: user._id,
    userImage: user.imageUrl,
    userName: user.name,
    userEmail: user.email,
  };


  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string,
  );


  return {
    accessToken,
  };
};



export const AuthServices = {
  loginUser,
};
