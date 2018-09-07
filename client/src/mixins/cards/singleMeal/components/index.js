import React from 'react';
import { changePhoto, HideMealCard } from '../../../../modules/WorkStation/utils';
import { AddToCart } from '../../../../actions/orders/';


const defaultUrl = 'https://images.unsplash.com/photo-1453831362806-3d5577f014a4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9dd8da96be0724ab84e4147d428f6bba&auto=format&fit=crop&w=500&q=60';
/**
 * @name SingleMealCard
 * @returns {function} React Component
 * @param {Object} Props The props passed to the item
 * wshould contain the current kitchen the item and the item;
 * @description Single Meal Card component, recieves data from it's parent container
 */
const SingleMealCard = ({ meal, kitchen, handleDelete, handleEdit, displayText, wantsToEdit, renderEditable, dispatch }) => (
    <div className="display-menu-item" id={meal.id} onMouseLeave={() => { HideMealCard(meal.id) }}>
      <div className="order-add-item">
        <img src={meal.image || defaultUrl} alt={meal.name} id={`image-${meal.id}`} className="main-meal-item-img" />
        <div className={`change-preview-image modifiable${meal.id}`} style={{ opacity: wantsToEdit ? 1 : 0, zIndex: wantsToEdit ? 5 : -1, display: wantsToEdit ? 'block' : 'none' }}>
          <p className="label-for-input"> Click to change Image </p>
          <input type="file" className={`input-file image-${meal.id}`} name="input-file" onChange={() => { changePhoto(`image-${meal.id}`)}} accept=".jpg, .png, .jpeg" />
        </div>
      </div>
      <div className="item-details">
        <div className="item-title-and-description">
          <p className={`item-title-main editable editable${meal.id}`}> {meal.name || ''} </p>
          <p className={`item-description editable editable${meal.id}`}> {meal.description || ''} </p>
        </div>
        <div className="buttons-array-and-togglers">
          {
          kitchen && kitchen.id === meal.kitchenId ?
          <p className="option-options"> { renderEditable && <span className="edit-meal-option" onClick={handleEdit} id={`target${meal.id}`}> {displayText} </span> } { wantsToEdit ? null : <span className="delete-meal-option" onClick={handleDelete}> Delete </span> } </p>
          : <p className="option-options" onClick={() => dispatch(AddToCart()(meal))}> Order </p>
        }
  
          <p className="option-options2" > N{meal.price} </p>
        </div>
      </div>
    </div>
);

export default SingleMealCard;