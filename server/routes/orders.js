import { Router } from 'express';
import BaseMiddleware from '../middlewares/base-middleware';
import OrdersMiddleware from '../middlewares/orders';
import AuthMiddleware from '../middlewares/auth/';
import KitchenMiddleware from '../middlewares/kitchen/';
import OrdersController from '../controllers/orders';
import MealMiddleware from '../middlewares/meals/'
import ErrorHandler from '../middlewares/error';

const router = Router();

/* These routes are written with the following assumptions
  1 orders are objects containing meal options, price, vendor and client
  2 Users and kitchens can maintain orders independent of each order;
  3 the routes will use a type & id query keys to determine who is requesting
    a user or kitchen;
  4 type=1 means it's a user's request, type=2 means it's a kitchen's request;
*/

/* this route expects that the request comes
  with a type key indicating whether it's for a user or a kitchen */
router.get('/', BaseMiddleware.checkAuthorization, OrdersMiddleware.__filterAccess, OrdersMiddleware.checkType, OrdersController.fetchOrders, ErrorHandler.dispatch);

/* this route is exclusive to only type=user as only users should be able to make new orders */
router.post('/', BaseMiddleware.checkForNullInput, BaseMiddleware.checkAuthorization, OrdersMiddleware.__filterAccess, OrdersController.create, ErrorHandler.dispatch);

//  this method should only allow kitchens change the processed key from false to true;
router.put('/:ooid', BaseMiddleware.checkForNullInput, OrdersMiddleware.checkRequiredParams, BaseMiddleware.checkAuthorization, OrdersMiddleware.__filterAccess, OrdersMiddleware.checkType, OrdersController.updateOne, ErrorHandler.dispatch);





export default router;
