import React from 'react';

export default () => (
  <div className="display-menu-item" id="item-1">
    <div className="order-add-item">
      <img src="https://images.unsplash.com/photo-1453831362806-3d5577f014a4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9dd8da96be0724ab84e4147d428f6bba&auto=format&fit=crop&w=500&q=60" id="image-3"className="main-meal-item-img" />
      <div className="change-preview-image modifiable1">
        <p className="label-for-input"> Click to change Image </p>
        <input type="file" className="input-file image-1" name="input-file" onChange="changePhoto('image-1')" accept=".jpg, .png, .jpeg" />
      </div>
    </div>
    <div className="item-details">
      <div className="item-title-and-description">
        <p className="item-title-main editable editable1"> It's not ghanaian</p>
        <p className="item-description editable editable1"> Bacon ipsum dolor amet doner fatback capicola salami jerky spare ribs andouille
         frankfurter sausage chuck prosciutto. tip flank cow biltong porchetta.
        </p>
      </div>
      <div className="buttons-array-and-togglers">
        <p className="option-options"> <span className="edit-meal-option" onClick="modify('editable1', 'modifiable1', 'target1')" id="target1"> Modify </span> <span className="delete-meal-option"> Delete </span> </p>
        <p className="option-options2" > N3000 </p>
      </div>
    </div>
  </div>
);

