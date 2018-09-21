import swal from 'sweetalert';
import { CartOps, generateKey } from '../ops';
import { DispatchNotification, RequiresPermission, ResolvePermission, StartProcess, EndProcess } from '../../actionTypes/misc';
import { RequestHandler } from '../helpers';
import config from '../../config';
import { GetLoggedInUser } from '../users';

/**
 * 
 * @param {*} key the identifier in the localStorage
 * @name AddToCart
 * @returns {null}
 */
const AddToCart = (key = generateKey()) => meal => dispatch => dispatch({ type: 'CHANGE_CART_ITEMS', payload: CartOps(key)(meal)({ add: true }) });


/**
 *
 * @param {*} key the identifier in the localStorage
 * @name AddToCart
 * @returns {null}
 */
const RemoveFromCart = (key = generateKey()) => meal => dispatch => dispatch({ type: 'CHANGE_CART_ITEMS', payload: CartOps(key)(meal)({ remove: true }) });

/**
 * @name CreateOrder
 * @description Method that creates a new order in the application
 * @param {obj} body this should contain a meals array to be created
 * @returns {null}
 */
const CreateOrder = ({ meals }) => history => (dispatch, getState) => {
  // if an unauthenticated user tries to make an order
  if (!GetLoggedInUser()) {
    const pendingFunction = () => {
      dispatch(ResolvePermission());
      dispatch(DispatchNotification('Welcome back. Click, Pay now to continue processing your order'));
      dispatch({ type: 'MODIFY_ACTIVITY_MAP', payload: true });
    };
    dispatch({ type: 'NEW_PENDING_FUNCTION', payload: pendingFunction });
    return dispatch(RequiresPermission());
  }
  const successCallback = (newOrder) => {
    dispatch(EndProcess());
    const orders = getState().orders.allOrders[`${getState().users.current.id}`];
    dispatch({ type: 'SET_ALL_ORDERS', payload: [newOrder, ...orders], id: getState().users.current.id });
    /* eslint-disable-next-line */
    process.env.NODE_ENV && process.env.NODE_ENV !== 'test' && swal(`Great Job, ${getState().users.current.firstname}`, `You have placed an order for ${meals.length} meals`, 'success');
    CartOps()()({ clear: true }); // remove the cart items from cache;
    history.push('/catalogue');
  };
  dispatch(StartProcess());
  return dispatch(RequestHandler({ url: `${config.url}/orders`, method: 'Post', data: { meals } })(successCallback));
};

/**
 * @name fetchAllOrders
 * @returns {null}
 * @description this function fetches all the meals belonging to a user
 * @param {string} type user or kitchen
 */
const fetchAllOrders = type => id => (dispatch) => {
  const successCallBack = (orders) => {
    dispatch(EndProcess());
    dispatch({ type: 'SET_ALL_ORDERS', payload: orders, id });
  };
  dispatch(StartProcess());
  const request = {
    method: 'get',
    url: `${config.url}/orders/?type=${type}`
  };
  return dispatch(RequestHandler(request)(successCallBack));
};


/**
 * @name EditOrder
 * @returns {null}
 * @description this function is used to edit an order
 * @param {object} data The order object to be edited
 */
const EditOrder = (data = {}) => ({ orderId, mealId, type }, message) => callback => (dispatch) => {
  const successCallback = () => {
    dispatch(EndProcess());
    swal(message, 'success')
      .then(() => callback && callback());
  };
  dispatch(StartProcess());
  dispatch(RequestHandler({ url: `${config.url}/orders/${orderId}/?mealId=${mealId}&type=${type}`, method: 'put', data })(successCallback));
};
export {
  AddToCart,
  RemoveFromCart,
  CreateOrder,
  fetchAllOrders,
  EditOrder
};
