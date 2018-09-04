import React, { Component } from 'react';
import { connect } from 'react-redux';
import CurrentOrderComponent from './components/CurrentOrder';
import RenderActualHistory from './components/RenderMainHistory';
import OrderHistoryHeader from './components/OrderHistoryHeader';
import AuthOnly from '../../hocs/AuthOnly';
import { fetchAllOrders } from '../../actions/orders';
import { CartOps } from '../../actions/ops/cart';
import '../styles/orders.scss';


class OrderHistoryPage extends Component {
  constructor(props) {
    super(props);
    // since the cart items are always in the cache,
    // makes sense to directly assign the stae
    this.state = {};
    this.state.currentMealsInCart = CartOps()()({});
  }
    state = {};

    componentDidMount = () => {
      const { dispatch, user, kitchen } = this.props;
      /* eslint-disable-next-line  */
      user && dispatch(fetchAllOrders('user')(user.id));
      return kitchen && dispatch(fetchAllOrders('kitchen')(kitchen.id));
    }

    render = () => (
      <div className="main-body-component">
        <OrderHistoryHeader />
        <div className="orders-page-side-one-main">
          { this.state.currentMealsInCart && this.state.currentMealsInCart.length && <CurrentOrderComponent meals={this.state.currentMealsInCart} history={this.props.history} /> }
          <RenderActualHistory orders={this.props.orders[`${this.props.user.id}`]}/>
        </div>
      </div>
    )
}

const mapStateToProps = state => ({
  kitchen: state.kitchens.target,
  user: state.users.current,
  orders: state.orders.allOrders || {}
});

export default connect(mapStateToProps)(AuthOnly(OrderHistoryPage));
