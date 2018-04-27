import { Router } from 'express';
import auth from './routes/auth';
import kitchens from './routes/kitchens';
import users from './routes/user';
import meals from './routes/meals';
import orders from './routes/orders';
import menus from './routes/menu'

const api = Router();

api
  .get('/heartbeat', (req, res) => res.send({ ok: true }))
  .use('/auth', auth)
  .use('/users', users)
  .use('/kitchens', kitchens)
  .use('/meals', meals)
  .use('/menus', menus)
  .use('/orders', orders);

api.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

// No routes matched? 404.
api.use((req, res) => res.status(404).end());

export default api;
