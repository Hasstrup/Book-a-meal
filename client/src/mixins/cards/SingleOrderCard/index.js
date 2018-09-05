import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CreateOrder, EditOrder } from '../../../actions/orders';
import ItemDetailsMain from './components/OrderDetails';
import MultipleOrders from './components/OrderSingleItem';
import './styles/index.scss';

class DisplayOrderCard extends Component {
    handleCreateOrder = () => {
      const { meals, dispatch, history } = this.props;
      const mealsWithQuantity = meals.map(meal => ({ ...meal, quantity: 1, kitchen: meal.KitchenId }));
      dispatch(CreateOrder({ meals: mealsWithQuantity })(history));
    }

    closeModal = () => {
      document.getElementsByClassName('render-modal')[0].style.display = 'none';
    }
    
    handleConfirmOrder = () => {
      const { order, kitchen, dispatch } = this.props;
      if (order.status[kitchen.id]) return; // do nothing because no order yet;
      return dispatch(EditOrder()({ orderId: order.id, type: 'kitchen' }, 'You have successfully proccessed the order')(this.closeModal));
    }
    render = () => (
      <div className="current-order-stack" style={{ ...this.props.style }}>
        <div className="current-order-stack-main">
          <ItemDetailsMain
            meals={this.props.meals || []}
            editable={this.props.editable}
            handleOrder={this.handleCreateOrder}
            handleConfirm={this.handleConfirmOrder}
            kitchen={this.props.kitchen}
            order={this.props.order}
            confirmable={this.props.kitchen && Object.keys(this.props.order.status).includes(this.props.kitchen.id)}
          />
          <div className="current-order-stack-main-card">
            { MultipleOrders(this.props.meals || [])({})}
          </div>
        </div>
      </div>
    )
}


export default connect(state => ({ kitchen: state.kitchens.target }))(DisplayOrderCard);
