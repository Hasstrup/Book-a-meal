import { Router } from 'express';

const router = Router();

/* get all the menus in the directory
  check if there is a kitchen querystring to return
  all the meals of a kitchen
*/
router.get('/', () => {
  // send all the kitchens
});

/* get a particular meal */
router.get('/:mealid', () => {
// check a particular user, check the query to know how much detail to send;
});

/* check the query string for kitchen and create the new meal, reject if none */
router.post('/', () => {

});

/* edit the subject meal id, check the req.query and forbid if there is no kitchen or the kitchen
  is not the owner of the menu;
*/
router.put('/:mealid', () => {
  // edit a new resource,
});

/* check the request for the kitchen query, reject request
if null or it doesnt match the owner of the item */
router.delete('/:mealid', () => {
  // call the necessary controller
});


export default router;
