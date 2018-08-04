import React from 'react';
import MealForm from '../../../../mixins/forms/MealForm';
import utils from '../../utils';

export default ({ handleSubmit }) => (
  <div className="menu-options-def">
    <div className="announce-item item-menu-options">
      <p className="announce-item-key motd-main"> Meal Options </p>
      <p className="announce-item-description motd-description">
                 Here are some insights on how you've fared
                 today and generally how well you've done so far
                 with us! Enjoy
      </p>
    </div>
    <div className="menu-options-comp-two">
      <div className="menu-options-grid list-grid">
        <div className="menu-options-grid grid-item">
          <p name="item-3" className="display-item-button"> Frid rice apple and chips <span> 3000</span></p>
        </div>
        <div className="menu-options-grid grid-item">
          <p name="item-3" className="display-item-button"> Frid rice apple and chips <span> 3000</span></p>
        </div>
        <div className="menu-options-grid grid-item">
          <p name="item-3" className="display-item-button"> Frid rice apple and chips <span> 3000</span></p>
        </div>
      </div>
      <MealForm />
      <div className="edit-button" id="show-menu" onClick={() => { handleSubmit(2)}}>
                  New meal
      </div>
    </div>
  </div>
);
