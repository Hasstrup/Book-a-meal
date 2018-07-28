import React from 'react';
import Multiplier from '../../helpers/multiplier';

export const SingleMenuCard = ({ data, history }) => (
  <div className="menu-item" id="content-1" onClick={() => history.push('/menu')}>
    <div className="img-item-and-description">
      <img className="content-item-img" src="https://media.timeout.com/images/104052097/630/472/image.jpg" />
      <div className="content-item-description" name="content-1">
        { /* remember to have a function that returns all of this */}
        <p> Fried Rice</p>
        <p> Super Sweet Sauce</p>
        <p> Marmalade </p>
        <div className="explore-content-button" />
      </div>
    </div>
    <div className="content-details-and-desc">
      <div className="item-card-desc">
        <p className="content-desc-name"> Cafe Mocha </p>
        <p className="content-desc-title">
                   Sharing a menu is super easy! There's no restrictions
                   whatsoever, all you have to do set up your kitchen/catering
                   service, add some meal options, set up a menu and we're good
                   to go .
          </p>
      </div>
      <div className="content-owner-image-and-time">
        <p className="caterer-name"> Native Kitchen Ng</p>
        <p className="time-posted"> 2 mins ago</p>
      </div>
    </div>
  </div>
);

export const MainCatalogue = Multiplier(SingleMenuCard);
