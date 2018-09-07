import React from 'react';
import config from '../../../config';

const generateImageFromMealsInMenu = (meals) => {
  if (!meals || !meals.length) return config.defaultMealImage;
  return meals.reduce((a, b) => {
    if (b.image) {
      a = b.image;
    }
    return a;
  }, config.defaultMealImage);
};

export default ({ menu }) => (
  <div className="menu-title-and-owner-grid">
    <div className="content-details">
      <img src={generateImageFromMealsInMenu(menu.meals)} className="content-avatar" alt="menuImage" />
      <div className="menu-details">
        <p className="menu-det-name"> { menu.name || '' } </p>
        <p className="menu-det-details">{menu.description || ''}</p>
      </div>
    </div>

    <div className="vendor-details-def">
      <p className="announce-vendor"> Vendor</p>
      <div className="vendor-details-main">
        <img src={(menu.kitchen && menu.kitchen.image) || config.defaultKitchenImage } className="content-avatar" alt="vendorImage" />
        <div className="vendor-details-brief">
          <p className="vendor-details-name">{menu.kitchen && menu.kitchen.name}</p>
          <p className="vendor-details-bio-brief">{menu.kitchen && menu.kitchen.description}</p>
        </div>
      </div>
      <p className="subscribe-button"> Subscribe </p>
    </div>
  </div>
);
