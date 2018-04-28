import { Router } from 'express';

const router = Router();

/* These routes are written with the following assumptions
  1 orders are objects containing meal options, price, vendor and client
  2 Users and kitchens can maintain orders independent of each order;
  3 the routes will use a type & id query keys to determine who is requesting
    a user or kitchen;
  4 type=1 means it's a user's request, type=2 means it's a kitchen's request;
*/


/* this fetches all the orders in the database,
if the type & did query keys are supplied, it fetches all the orders
made BY the user or all the orders made TO the kitchen */
router.get('/', () => {
  // send all the kitchens
});

// this should get the order contained in the id
router.get('/:orderId', () => {});

/* this route is exclusive to only type=1 as only users should be able to make new orders */
router.post('/', () => {
  // set the menu of the day for the subject kitchen
});


//  this method should only allow kitchens change the processed key from false to true;
router.put('/:orderId', () => {
// send a particular user, check the query to know how much detail to send;
});

// this should create a new menu and expects the kitchenId in the query;
router.post('/new', () => {
  // add a new menu
});

// Edits menu contained in the mealID after checking the query for the kitchenID;
router.put('/:menuID', () => {
  // edit a new resource
});

// delete a menu also checks for the kitchen in the query object
router.delete('/:menuId', () => {

});


export default router;
