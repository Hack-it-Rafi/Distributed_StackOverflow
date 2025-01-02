// import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const {  accessToken } = result;

  // res.cookie('token', accessToken, {
  //   secure: config.NODE_ENV === 'production',
  //   httpOnly: true,
  // });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User is logged in succesfully!',
    data: {
      accessToken
    },
  });
});


export const AuthControllers = {
  loginUser,
};
