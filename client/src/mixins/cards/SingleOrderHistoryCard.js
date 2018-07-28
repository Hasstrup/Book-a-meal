import React from 'react';
import MultiplyComponents from '../../helpers/multiplier';

const SingleOrderHistoryCard =  () => (
  <div className="order-story-card" onClick="modal()">
    <div className="order-top">
        <img src="https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_inbody_900x506%2Fpublic%2F1502824044%2Froyal-farms-best-gas-station-food-FT-SS0817.jpg%3Fitok%3Dig79fdSU&w=700&q=85" className="order-random-image" />
        <div className="order-main-details">
        <p className="order-contents"> Fried Rice & Pringles </p>
      </div>
      </div>
    <p className="show-order-date"> 27/08/2018. <span> 20:18am </span></p>
  </div>
);

console.log(MultiplyComponents(SingleOrderHistoryCard)([1,2])({}))
export default MultiplyComponents(SingleOrderHistoryCard);
