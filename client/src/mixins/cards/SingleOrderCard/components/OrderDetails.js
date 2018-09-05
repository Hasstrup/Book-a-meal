import React from 'react';

export default ({
  meals,
  handleOrder,
  editable,
  kitchen,
  order,
  handleConfirm,
  confirmable
}) => (
  <div className="current-order-stack-side-one">
    <div className="content-item">
      <p className="content-item-key"> Items ordered </p>
      <p className="content-item-value"> {meals.length ? meals.length : 0}</p>
    </div>
    <div className="content-item">
      <p className="content-item-key"> Total Amount</p>
      <p className="content-item-value"> N{generatePrice(meals)} </p>
    </div>
    {
          (editable || confirmable) &&
          <div className="pay-button-large" onClick={() => { editable ? handleOrder() : handleConfirm(); }}>
            {editable ? 'Order now' : ((kitchen && !order.status[kitchen.id] && 'Confirm') || 'Processed')}
          </div>
      }
  </div>
);

const generatePrice = meals => meals.reduce((acc, meal) => acc + meal.price, 0);
