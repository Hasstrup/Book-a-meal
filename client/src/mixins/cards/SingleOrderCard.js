import React from 'react';
import MultiplyComponents from '../../helpers/multiplier';

export default ({ data }) => (
<div className="current-order-stack">
<div className="current-order-stack-main">
    <ItemDetailsMain />
    <div className="current-order-stack-main-card">
      { MultiplyComponents(SingleOrderItem)(data)({})}
    </div>
  </div>
</div>
);


const ItemDetailsMain = () => (
  <div className="current-order-stack-side-one">
    <div className="content-item">
      <p className="content-item-key"> Items in cart </p>
      <p className="content-item-value"> 3 </p>
    </div>
    <div className="content-item">
      <p className="content-item-key"> Total Amount</p>
      <p className="content-item-value"> N2500 </p>
    </div>
    <div className="content-item" id="last-item">
      <p className="content-item-key"> Menus </p>
      <p className="content-item-value"> 4 </p>
    </div>
    <div className="pay-button-large">
          Pay Now
    </div>
  </div>
);
const SingleOrderItem = () => (
  <div className="card-order-level-1">
    <div className="main-order-card-one">
      <p className="main-order-meal-name"> Carrot Potato </p>
      <p className="main-order-menu-and-price"> Desi Kitchen <span id="separator"> | </span> <span id="content-price"> N2000 </span> </p>
      <p className="main-order-vendor-name"> Hello Desi </p>
      <p className="close-button"> x </p>
    </div>
  </div>
);
