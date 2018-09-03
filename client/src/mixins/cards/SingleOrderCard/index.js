import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CreateOrder } from '../../../actions/orders';
import ItemDetailsMain from './components/OrderDetails';
import MultipleOrders from './components/OrderSingleItem';

class DisplayOrderCard extends Component {
    handleCreateOrder = () => {
      const { meals, dispatch, history } = this.props;
      const mealsWithQuantity = meals.map(meal => ({ ...meal, quantity: 1, kitchen: meal.KitchenId }));
      dispatch(CreateOrder({ meals: mealsWithQuantity })(history));
    }
    render = () => (
      <div className="current-order-stack">
        <div className="current-order-stack-main">
          <ItemDetailsMain
            meals={this.props.meals || []}
            editable={this.props.editable}
            handleOrder={this.handleCreateOrder}
          />
          <div className="current-order-stack-main-card">
            { MultipleOrders(this.props.meals || [])({})}
          </div>
        </div>
      </div>
    )
}

export default connect()(DisplayOrderCard);
