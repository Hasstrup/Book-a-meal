import React from 'react';
import moment from 'moment';
import Multiplier from '../../helpers/multiplier';
import { FetchSpecificMenu } from '../../actions/menus';
import { liftCard, dropCard } from '../utils';


export const SingleMenuCard = ({ data, history, dispatch }) => {
  // return the menu names: YOU might want to splice this
  const generateMealNames = () => data.meals.map(meal => (<p>{ meal.name }</p>));

  // seems neater but will iterate through every item, so not scsalable, TODO: fix
  const generateImage = () => {
    if (data.meals.length === 1) {
      return data.meals[0].image ? data.meals[0].image : 'https://images.unsplash.com/photo-1514536338919-cd001f6dc6b3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=48f4f1385c293d8520c1f9c3233a98d6&auto=format&fit=crop&w=800&q=60';
    }
    return data.meals.reduce((a, b) => {
      // b is a meal
      if (b.image) return b.image;
      return 'https://images.unsplash.com/photo-1514536338919-cd001f6dc6b3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=48f4f1385c293d8520c1f9c3233a98d6&auto=format&fit=crop&w=800&q=60';
    });
  };

  const animateMenuComponent = () => liftCard(`content-${data.id}`);

  return (
    <div
      className="menu-item"
      id={`content-${data.id}`}
      onClick={() => dispatch(FetchSpecificMenu(data.id)(history)())}
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
          <p className="caterer-name"> {data.kitchen.name}</p>
          <p className="time-posted"> {moment(new Date(data.createdAt)).fromNow()}</p>
        </div>
      </div>
    </div>
  );
};


export const MainCatalogue = Multiplier(SingleMenuCard);
