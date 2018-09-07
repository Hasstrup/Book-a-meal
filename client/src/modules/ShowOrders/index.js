import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import CurrentOrderComponent from './components/CurrentOrder';
import RenderActualHistory from './components/RenderMainHistory';
import OrderHistoryHeader from './components/OrderHistoryHeader';
import AuthOnly from '../../hocs/AuthOnly';
import { DispatchNotification } from '../../actionTypes/misc';
import { fetchAllOrders } from '../../actions/orders';
import { CartOps } from '../../actions/ops/cart';
import '../styles/orders.scss';


class OrderHistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.target = this.props.user;
    this.state.ordersInView = this.props.orders[this.props.user.id];
    this.state.currentMealsInCart = CartOps()()({});
  }

    componentDidMount = () => {
      const { dispatch, user, kitchen } = this.props;
      /* eslint-disable-next-line  */
      user && dispatch(fetchAllOrders('user')(user.id));
      kitchen && dispatch(fetchAllOrders('kitchen')(kitchen.id));
    }

    componentDidUpdate = (prevProps) => {
      const { orders } = this.props;
      const { target } = this.state;
      if (orders[target.id] && orders[target.id].length) {
        if (!prevProps.orders[target.id] || !prevProps.orders[target.id].length) return this.setState({ ordersInView: this.props.orders[this.state.target.id] });
      }
    }

    changeTarget = (target) => {
      const { dispatch, orders } = this.props;
      dispatch(DispatchNotification(`You are now seeing orders made ${target.name ? 'to' : 'by'} ${target.name || target.firstname}`));
      dispatch(fetchAllOrders(target.type)(target.id));
      this.state.target = target;
      // this rerender here will update the dom;
      this.setState({ ordersInView: orders[`${target.id}`] });
    }

    render = () => (
      <div className="main-body-component" style={{ minHeight: '100vh' }}>
        <OrderHistoryHeader kitchen={this.props.kitchen} handleChange={this.changeTarget} user={this.props.user} target={this.state.target} />
        <div className="orders-page-side-one-main">
          { this.state.currentMealsInCart && this.state.currentMealsInCart.length && <CurrentOrderComponent meals={this.state.currentMealsInCart} history={this.props.history} /> }
          <RenderActualHistory
            orders={this.state.ordersInView}
            determineRenderBy={this.state.ordersInView}
            callback={() => {
            this.props.history.push('/catalogue');
            swal(`Here you go ${this.props.user.firstname}, make your from here`, 'PS: they are all yummy', 'success');
          }}
            text={this.state.target.id === this.props.user.id ? ` Aw schucks, ${this.state.target.firstname} hasn't made an order yet` : 'Looks like no one has made an order yet'}
            subtitle="order your first item"
            emptyContainerStyle={{
            height: '10%',
            position: 'relative',
            bottom: '-14vh'
          }}
          />
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
