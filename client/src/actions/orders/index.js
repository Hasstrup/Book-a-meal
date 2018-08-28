import { CartOps, generateKey } from '../ops';
import { DispatchNotification, RequiresPermission, ResolvePermission } from '../../actionTypes/misc';
import { GetLoggedInUser } from '../users';

const AddToCart = (key = generateKey()) => meal => dispatch => dispatch({ type: 'CHANGE_CART_ITEMS', payload: CartOps(key)(meal)({ add: true }) });
const RemoveFromCart = (key = generateKey()) => meal => dispatch => dispatch({ type: 'CHANGE_CART_ITEMS', payload: CartOps(key)(meal)({ remove: true }) });

const CreateOrder = meals => history => (dispatch) => {
  if (!GetLoggedInUser()) {
    const pendingFunction = () => {
      dispatch(ResolvePermission());
      dispatch(DispatchNotification('Welcome back. Click, Pay now to continue processing your order'));
      dispatch({ type: 'MODIFY_ACTIVITY_MAP', payload: true });
    };
    dispatch({ type: 'NEW_PENDING_FUNCTION', payload: pendingFunction });
    return dispatch(RequiresPermission());
  }
};
export {
  AddToCart,
  RemoveFromCart,
  CreateOrder
};
