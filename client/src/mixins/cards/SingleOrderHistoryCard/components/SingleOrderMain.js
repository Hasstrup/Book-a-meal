import React from 'react';
import moment from 'moment';

const defaultUri = 'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_inbody_900x506%2Fpublic%2F1502824044%2Froyal-farms-best-gas-station-food-FT-SS0817.jpg%3Fitok%3Dig79fdSU&w=700&q=85';

export default ({ data, handleClick }) => {
  const target = data.meals[0];
  return (
    <div className="order-story-card" onClick={handleClick}>
      <div className="order-top">
        <img src={target && (target.image || defaultUri)} alt="order" className="order-random-image" />
        <div className="order-main-details">
          <p className="order-contents">{(target && target.name) || ''}</p>
        </div>
      </div>
      <p className="show-order-date">{moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
    </div>
  );
};

