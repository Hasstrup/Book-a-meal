import React from 'react';
import OrderHistoryGrid from './OrderHistoryGrid'

export default () => (
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
        <OrderHistoryGrid title="Today" />
        <OrderHistoryGrid title="Yesterday" />
        <OrderHistoryGrid title="This week" />
      </div>
    </div>
);