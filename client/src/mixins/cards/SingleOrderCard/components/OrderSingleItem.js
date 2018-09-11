import React from 'react';
import Iterator from '../../../../helpers/multiplier';

const SingleOrderItem = ({ data, editable }) => (
  <div className="card-order-level-1">
      <div className="main-order-card-one">
        <p className="main-order-meal-name"> { data.name || ''} </p>
        <p className="main-order-menu-and-price"> { editable && <span> Change </span>}<span id="content-price"> N{data.price || ''} </span> </p>
        <p className="main-order-vendor-name"> Quantity: <span> {data.quantity || 1 }</span></p>
        { editable && <p className="close-button"> remove </p> }
      </div>
    </div>
);


export default Iterator(SingleOrderItem)([ // iterable aray ])({ props });
