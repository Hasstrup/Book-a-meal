import React from 'react';
import { connect } from 'react-redux';
import { RemoveFromCart } from '../../actions/orders';
import '../../modules/styles/menu.scss';

const ActivityMap = ({ dispatch, cart, showCart }) => (
  <section className="activity-bar" style={{ display: showCart ? 'flex' : 'none' }}>
    <div className="activity-side-one">
      <div className="summary-tab">
        <p className="activity-tab-def"> Activity </p>
        <p className="current-orders-def move-down"> Current orders  <span> { cart && cart.length}</span> </p>
        <p className="display-total-def move-down"> Total <span> N{!cart.length ? 0 : generatePrice(cart) } </span> </p>
        <p className="go-to-cart-button move-down"> Go to cart </p>
        <p className="share-a-menu-button move-down"> Share a menu </p>
      </div>
      <p className="point-to-items">   Cart </p>
      <div className="items-currently-in-cart">
        { cart && cart.map(meal => <CurrentOrderCard meal={meal} dispatch={dispatch}/>)}
      </div>
    </div>
    <div className="activity-side-two">
      <div className="check-out-button">
         Pay Now
      </div>
      <p className="close-item" onClick={() => dispatch({ type: 'MODIFY_ACTIVITY_MAP' })}> close </p>
    </div>
  </section>
);

const CurrentOrderCard = ({ dispatch, meal }) => (
  <div
    className="items-currently-in-stock"
    style={{
    height: '40px',
    width: '70px',
    backgroundColor: '#E5E7E9',
    borderRadius: '2px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}
  >
    <p style={{ color: '#909497', marginRight: '12px' }}>{ `${meal.name.split('').slice(0, 9).join('')}...`}</p>
    <p style={{ color: '#797D7F', fontFamily: 'granary', fontSize: '14px' }} onClick={() => dispatch(RemoveFromCart()(meal))}> x </p>
  </div>
);

const generatePrice = meals => meals.reduce((acc, meal) => acc + meal.price, 0);

const mapStateToProps = state => ({
  showCart: state.orders.showCart,
  cart: state.orders.cart
});

export default connect(mapStateToProps)(ActivityMap);
