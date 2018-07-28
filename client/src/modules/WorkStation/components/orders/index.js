import React from 'react';

export default () => (
  <div className="direct-order-history">
    <div className="announce-item item-order-history">
      <p className="announce-item-key order-history-heading"> Order history </p>
      <p className="announce-item-description order-history-description">
                    Here are some insights on how you've fared
                    today, it updates real time, so best believe we've got you!
                    Enjoy
      </p>
    </div>
    <div className="direct-to-order-page">
      <p className="main-order-text">
                     Hey! so we built a whole new page for you
                     to explore your orders on the fly. You can switch
                     roles while in that page so you can see your orders
                     as a regular user or as a caterer. Each comes with a different
                     suite of capabilities. Enjoy!<br />
        <span className="order-history"> Visit order history</span>
      </p>
    </div>
  </div>
);
