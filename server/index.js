import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import logger from 'morgan';
import api from './api';
import sync from './models/v2/sync';

dotenv.config();

const PORT = process.env.PORT || 3900;
const app = express();

console.log(process.env.PORT);

// // Database syncing
// sync()
// .then(() => { console.log('DB is done syncing') })
// .catch(e => console.log(e))

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(logger('dev'))
  // api versioning;
  .use('/api/v1', api)
  .get('/*', (_, res) => res.send('Cant find resource').status(400))
  .listen(PORT, () => {
    if (process.env.NODE_ENV === 'development') {
      /* eslint no-console: 0 */
      console.log(`The Dev server is running on port ${PORT}`);
    } else {
      console.log(`The production server is now running at ${PORT}`);
    }
  });

export default app;
