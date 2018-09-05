import React from 'react';
import OrderHistoryGrid from './OrderHistoryGrid';
import SortableHOC from '../helpers/SortOrdersByDate';
import NotEmptyHOC from '../../../hocs/NonEmpty';

const OrderHistoryComponent = ({ orders }) => (
  <div className="history-section">
    <div className="introduce-history">
      <p className="introduce-history-main"> History </p>
      <p className="introduce-history-desc">
          So we've been trying to help you enjoy the experience on
          this service, that's why we took the time to stack all
          your orders together, so you have some insights on things
          you like. Enjoy
      </p>
    </div>
    { /* History */}
    <div className="main-history-storybook">
      { SortableHOC(OrderHistoryGrid)({ orders, key: 1, title: 'Today' })}
      { SortableHOC(OrderHistoryGrid)({ orders, key: 7, title: 'This week' })}
    </div>
  </div>
);

export default NotEmptyHOC(OrderHistoryComponent);