import React from 'react';

export default () => (
  <div className="new-meal-form">
    <div className="new-meal-row">
      <div className="new-meal-side-one">
        <div contentEditable="true" className="new-meal-title">
                            Meal name
        </div>
        <div contentEditable="true" className="new-meal-description">
                            description
        </div>
        <div contentEditable="true" className="new-meal-price">
                            Price
        </div>
        <div className="input-types">
          <input type="file" accept=".jpg, .jpeg, .png" onChange="changePhoto()" name="input-file" id="file" className="inputfile" />
          <label htmlFor="input-file" className="label-input-file"> Preview </label>
        </div>
      </div>
    </div>
    <img className="preview-image" id="preview-image" alt="" src="test.jpg" />
  </div>
);
