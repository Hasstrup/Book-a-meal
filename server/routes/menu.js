import { Router } from 'express';

const router = Router();

/* These routes are written with the following assumptions
  1 a menu has many meal options
  2 a menu belongs to a kitchen(caterer);
  3 a kitchen(caterer) has many menus
*/

/*  get the menu of the day;
  this method checks for the kitchen id query key in the request object
  to determine whether to return all the kitchens in the dbs or the ones belonging
  to the subject kitchen
 */

router.get('/', () => {
  // send all the kitchens
});


router.get('/catalogue', () => {
  // fetches all the menus of the day from the mock data store;
});

/* the kitchen id is absolutely important and
will forbid if there isnt one */

router.post('/', (req, res) => {
  // set the menu of the day for the subject kitchen
});


//  get the menu of a particular kitchen
router.get('/:kitchenId', (req, res) => {
// send a particular user, check the query to know how much detail to send;
});

// this should create a new menu and expects the kitchenId in the query;
router.post('/new', (req, res) => {
  // add a new menu
});

// Edits menu contained in the mealID after checking the query for the kitchenID;
router.put('/:menuID', (req, res) => {
  // edit a new resource
});

// delete a menu also checks for the kitchen in the query object
router.delete('/:menuId', (req, res) => {

});





export default router;
