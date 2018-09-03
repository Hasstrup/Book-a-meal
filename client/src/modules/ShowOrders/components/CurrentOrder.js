import React from 'react';
import DisplayOrderCardLg from '../../../mixins/cards/SingleOrderCard/index';

export default ({ meals, history }) => (
  <div className="display-current-order">
      { /* header */}
      <div className="display-current-order-heading">
        <p className="display-current-order-heading-head"> Current Order </p>
        <p className="display-current-order-heading-desc">
                   This contains all the meal options you have placed
                   orders for in this current session.
        </p>
      </div>
      <DisplayOrderCardLg meals={meals} editable history={history}/>
    </div>
);
