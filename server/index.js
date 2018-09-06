import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import api from './api';
import sync from './models/v2/sync';

dotenv.config();

const PORT = process.env.PORT || 3900;
const app = express();

// sync()
// .then(() => {
//   console.log('DB is done syncing')
// })

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cors())
  .use(logger('dev'))
  // api versioning;
  .use(express.static('public'))
  .use('/api/v1', api)
  .get('/*', (_, res) => res.sendFile(path.join(`${__dirname}/public/index.html`)))
  .listen(PORT, () => {
    if (process.env.NODE_ENV === 'development') {
      /* eslint no-console: 0 */
      console.log(`The Dev server is running on port ${PORT}`);
    } else {
      console.log(`The production server is now running at ${PORT}`);
    }
  });

export default app;
