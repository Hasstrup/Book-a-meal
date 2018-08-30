import { Router } from 'express';
import auth from './routes/auth';
import kitchens from './routes/kitchens';
import users from './routes/user';
import meals from './routes/meals';
import orders from './routes/orders';
import menus from './routes/menu';
import BaseMiddleware from './middlewares/base-middleware';


const api = Router();

api
  .get('/heartbeat', (req, res) => res.send({ ok: true }))
  .use('/auth', auth)
  .use('/users', BaseMiddleware.formatPaginationQuery, users)
  .use('/kitchens', BaseMiddleware.formatPaginationQuery, kitchens)
  .use('/meals', BaseMiddleware.formatPaginationQuery, meals)
  .use('/menus', BaseMiddleware.formatPaginationQuery, menus)
  .use('/orders', BaseMiddleware.formatPaginationQuery, orders);

// No routes matched? 404.
api.use((req, res) => res.status(404).json({ error: 'Sorry that route/method doesnt exist' }));

export default api;
