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
//   .then(() => {
//     console.log('DB is done syncing');
//   });

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cors())
  .use(logger('dev'))
  // api versioning;
  .use(express.static('public'))
  .get('/docs', (req, res) => res.redirect('https://documenter.getpostman.com/view/5333808/RWaHxpPg'))
  .use('/api/v1', api)
  .get('/*', (_, res) => res.sendFile(path.join(`${__dirname}/public/index.html`)))
  .use('*', (_, res) => res.status(400).json({ error: 'Sorry we cant find that resource' }))
  .use((err, req, res, next) => res.status(err.status || 422).json({ error: err.message || 'Sorry we couldnt process that request' }))
  .listen(PORT, () => {
    if (process.env.NODE_ENV === 'development') {
      /* eslint no-console: 0 */
      console.log(`The Dev server is running on port ${PORT}`);
    } else {
      console.log(`The production server is now running at ${PORT}`);
    }
  });

export default app;
