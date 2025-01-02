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


app.use("/", async (req: Request, res: Response) => {
  res.send("StackOverflow Notification running");
})


app.use(globalErrorHandler);

app.use(notFound);

export default app;
