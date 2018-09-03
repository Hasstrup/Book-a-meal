import React from 'react';

export default () => (
  <div className="orders-page-side-one">
      <div className="orders-heading-and-desc">
        <p className="orders-page-heading"> Orders </p>
        <p className="orders-page-desc">
          This is a page dedicated for you
          to manage your orders as a regular
          user or as a vendor. You can check your
          monitor the current items in cart
          and check with your previous order history.
          Enjoy!
        </p>
      </div>
      <div className="convey-account-details">
        <p className="convey-account-order">
           You are currently viewing this page as <br />
          <span id="user-details-init"> Hasstrup Ezekiel </span> <br />
        </p>
        <div className="display-click-message">
          <p onClick="showAccountsMenu()"> Click to switch account </p>
          <div className="display-current-user">
            <div className="user-list-item"> Hello Desi kitchen </div>
            <div className="user-list-item"> Hasstrup Ezekiel </div>
          </div>
        </div>
      </div>
    </div>
);
