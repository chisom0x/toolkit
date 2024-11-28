import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import router from './routes/index';
import globalErrorHandler from './utils/global_error_handler';

dotenv.config();

export const createServer = () => {
  const app = express();

  app.use(express.json());

  app.get('/', (req: express.Request, res: express.Response) => {
    res.json({ message: 'Hello World' });
  });

  app.use('/api/v1/toolkit', router);
  app.use(globalErrorHandler);

  return app;
};
