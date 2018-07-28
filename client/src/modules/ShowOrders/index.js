import React, { Component } from 'react';
import DisplayOrderCardLg from '../../mixins/cards/SingleOrderCard';
import MultipleHistory from '../../mixins/cards/SingleOrderHistoryCard';
import '../styles/orders.scss'


const OrderHistoryHeader = () => (
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

const CurrentOrderComponent = () => (
  <div className="display-current-order">
    { /* header */}
    <div className="display-current-order-heading">
      <p className="display-current-order-heading-head"> Current Order </p>
      <p className="display-current-order-heading-desc">
                 This contains all the meal options you have placed
                 orders for in this current session. Your first order
                 was placed at <span> 2:08pm</span>.
      </p>
    </div>
    <DisplayOrderCardLg data={[1,2,3]}/>
  </div>
);

const RenderActualHistory = () => (
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
      <OrderHistory title="Today" />
      <OrderHistory title="Yesterday" />
      <OrderHistory title="This week" />
    </div>

  </div>
);

const OrderHistory = ({ title }) => (
  <div className="today-story">
    <div className="today-text">
      <div className="today-introduction">
        <p className="today-intro"> { title } </p>
        <p className="today-intro-desc">
             This is a collection of all the batches of items
             you paid for today. Had dinner yet?
        </p>
      </div>
    </div>
    { /* This is the damn ting */}
    <div className="order-story-grid">
      { MultipleHistory([1, 2, 3, 4])({})}
    </div>
  </div>
);


export default class OrderHistoryPage extends Component {
    state = {};
    render = () => (
      <div className="main-body-component">
        <OrderHistoryHeader />
        <div className="orders-page-side-one-main">
          <CurrentOrderComponent />
          <RenderActualHistory />
        </div>
      </div>
    )
}
