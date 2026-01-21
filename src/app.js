import express from 'express';
import cors from 'cors';
import authenticationRouter from './routers/authentication.router.js';
import userRouter from './routers/user.router.js'
import cookieParser from 'cookie-parser';


const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authenticationRouter);
app.use('/api/v1/user', userRouter);

export default app;