import React from 'react';

export default ({ meals, handleOrder, editable }) => (
  <div className="current-order-stack-side-one">
    <div className="content-item">
        <p className="content-item-key"> Items in cart </p>
        <p className="content-item-value"> {meals.length ? meals.length : 0}</p>
      </div>
    <div className="content-item">
        <p className="content-item-key"> Total Amount</p>
        <p className="content-item-value"> N{generatePrice(meals)} </p>
      </div>
    {
          editable &&
          <div className="pay-button-large" onClick={handleOrder}>
            Order Now
          </div>
      }
  </div>
);

const generatePrice = meals => meals.reduce((acc, meal) => acc + meal.price, 0);