import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();
import cookieParser from 'cookie-parser';
// import smsRouter from './sms/smsRoutes';

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5003', 'http://localhost:5002', 'http://localhost:5001', 'http://localhost:5000',],
  // origin: true,
  credentials: true,
};

// parsers
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// application routes
app.use('/api/v1', router);


app.use("/", async (req: Request, res: Response) => {
  res.send("StackOverflow Post running");
})


app.use(globalErrorHandler);

app.use(notFound);

export default app;
