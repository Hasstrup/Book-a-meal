import express from 'express';
import api from './api';

const app = express();
const PORT = process.env.PORT || 3500



app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'Developemt') {
    /* eslint no-console: 0 */
    console.log(`The Dev server is running on port ${PORT}`)
  } else {
    console.log(`The production server is now running at ${PORT}`);
  }
});
