import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();
import cookieParser from 'cookie-parser';
// import smsRouter from './sms/smsRoutes';

const corsOptions = {
  // origin: ['http://localhost:5173', 'http://10.100.202.96:5173/'],
  origin: true,
  credentials: true,
};

// parsers
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
// app.use('/api/v1/sms', smsRouter);

// application routes
app.use('/api/v1', router);

app.post('/api/v1/jwt', async (req: Request, res: Response) => {
  const user = req.body;

  try {
    const token = jwt.sign(user, process.env.JWT_ACCESS_SECRET as string, {
      // expiresIn: '1h',
      expiresIn: '12h',
    });

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        // maxAge: 3600000, 
        maxAge: 12 * 60 * 60 * 1000,
      })
      .send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, message: 'JWT generation failed' });
  }
});

app.use("/", async (req: Request, res: Response) => {
  res.send("StackOverflow Log running");
})

app.post('/api/v1/logout', async (req: Request, res: Response) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    .send({ success: true });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
