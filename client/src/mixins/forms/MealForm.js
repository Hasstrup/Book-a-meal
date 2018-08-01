import React from 'react';
import utils from '../../modules/WorkStation/utils';

const { changePhoto } = utils;

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
          <input type="file" accept=".jpg, .jpeg, .png" onChange={() => changePhoto()} name="input-file" id="file" className="inputfile" />
          <label htmlFor="input-file" className="label-input-file"> Preview </label>
        </div>
      </div>
      <img className="preview-image" id="preview-image" alt="" src="https://images.unsplash.com/photo-1432139509613-5c4255815697?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=616fc216eff2732910545ebd5d5018b6&auto=format&fit=crop&w=800&q=60" />
    </div>
    {/* TODO: Change the placeholder for this image */}
  </div>
);
