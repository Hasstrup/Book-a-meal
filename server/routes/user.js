import { Router } from 'express';

const router = Router();

/* Simple crud for users, The create functionality is wrapped into the auth module in ./auth.js */

router.get('/', () => {
  // get all users
});

router.get('/:user_id', () => {
// send a particular user, check the query to know how much detail to send;
});

router.put('/:user_id', () => {
  // edit a new resource;
});

router.delete('/:user_id', () => {

});


export default router;
