import React from 'react';
import { HideMealCard } from '../../modules/WorkStation/utils';

const defaultUrl = "https://images.unsplash.com/photo-1453831362806-3d5577f014a4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9dd8da96be0724ab84e4147d428f6bba&auto=format&fit=crop&w=500&q=60"
export default ({ meal, user }) => (
  <div className="display-menu-item" id={meal.id} onMouseLeave={() => { HideMealCard(meal.id) }}>
    <div className="order-add-item">
      <img src={meal.image || defaultUrl} alt={meal.name} id={`image-${meal.id}`} className="main-meal-item-img" />
      <div className="change-preview-image modifiable1">
        <p className="label-for-input"> Click to change Image </p>
        <input type="file" className="input-file image-1" name="input-file" onChange="changePhoto('image-1')" accept=".jpg, .png, .jpeg" />
      </div>
    </div>
    <div className="item-details">
      <div className="item-title-and-description">
        <p className="item-title-main editable editable1"> {meal.name || ''} </p>
        <p className="item-description editable editable1"> {meal.description || ''} </p>
      </div>
      <div className="buttons-array-and-togglers">
        <p className="option-options"> <span className="edit-meal-option" onClick="modify('editable1', 'modifiable1', 'target1')" id="target1"> Modify </span> <span className="delete-meal-option"> Delete </span> </p>
        <p className="option-options2" > N{meal.price} </p>
      </div>
    </div>
  </div>
);

