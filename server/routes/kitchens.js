import { Router } from 'express';

const router = Router();

/* These routes are written following the structure of a user
 having a kitchen and the kitchen being the focal point of activity for
 the whole association.
  */

/* this gets all the kitchens in the databases
  if there is the user_id query, the n it gets
  the kitchen of that user
*/
router.get('/', () => {
  // send all the kitchens
});

/* this checks for the user_id in the query and creates the new kitchen, forbids if there isnt */
router.post('/', () => {
// send a particular user, check the query to know how much detail to send;
});

/* this checks for the user_id in the query and edits the new kitchen, forbids if there isnt */
router.put('/', () => {
  // crete a new kitchen
});

// this route seeks for the user_id query and then deletes the target if the resource is found
router.delete('/', () => {

});

// this route subscribes the user embedded in the uid query params to the kitchen
router.put('/subscribe/:kithchenid', () => {
  // edit a new resource
});

// This gets the subscribers of a particular kitchen belonging to a kitchen;
router.get('/subscribers', () => {

});


export default router;
