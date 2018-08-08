import React from 'react';
import moment from 'moment';
import Multiplier from '../../helpers/multiplier';
import { liftCard, dropCard } from '../utils';


export const SingleMenuCard = ({ data, history }) => {
  // return the menu names: YOU might want to splice this
  const generateMealNames = () => data.Meals.map(meal => (<p>{ meal.name }</p>));

  // seems neater but will iterate through every item, so not scsalable, TODO: fix
  const generateImage = () => data.Meals.reduce((a, b) => {
    if (a.image) return a.image;
    return a;
  });

  const animateMenuComponent = () => liftCard(`content-${data.id}`);

  return (
    <div
      className="menu-item"
      id={`content-${data.id}`}
      onClick={() => history.push('/menu')}
      onMouseEnter={animateMenuComponent}
      onMouseLeave={() => { dropCard(`content-${data.id}`); }}
    >
      <div className="img-item-and-description">
        <img className="content-item-img" src={generateImage()} />
        <div className="content-item-description" name={`content-${data.id}`}>
          { /* remember to have a function that returns all of this */}
          { generateMealNames() }
          <div className="explore-content-button" />
        </div>
      </div>
      <div className="content-details-and-desc">
        <div className="item-card-desc">
          <p className="content-desc-name"> {data.name} </p>
          <p className="content-desc-title">{data.description}</p>
        </div>
        <div className="content-owner-image-and-time">
          <p className="caterer-name"> {data.Kitchen.name}</p>
          <p className="time-posted"> {moment(new Date(data.createdAt)).fromNow()}</p>
        </div>
      </div>
    </div>
  );
};


export const MainCatalogue = Multiplier(SingleMenuCard);
