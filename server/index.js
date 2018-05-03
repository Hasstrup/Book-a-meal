import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import logger from 'morgan';
import api from './api';
import config from './config/config.json';
import db from './models/'



const PORT = process.env.PORT || 3500;
const app = express();
dotenv.config();
// use body parsing middleware to translate the req.body;
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(logger('dev'))
  // api versioning;
  .use('/api/v1', api)
  .get('/*', (_, res) => res.send('Cant find resource').status(400))
  .listen(PORT, () => {
    if (process.env.NODE_ENV === 'developemt') {
      /* eslint no-console: 0 */
      console.log(`The Dev server is running on port ${PORT}`);
    } else {
      console.log(`The production server is now running at ${PORT}`);
    }
  });

export default app;
