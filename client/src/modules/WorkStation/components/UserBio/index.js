import React from 'react';

export default () => (
  <div className="show-user-and-kitchen-profile">
    <RenderUserBio />
    <RenderKitchenProfile />
  </div>
);

const RenderKitchenProfile = () => (
  <div className="show-kitchen-profile new-kitchen">
    <div className="kitchen-text-details">
      <img src="test.jpg" className="profile-picture-kitchen" alt="" />
      <div className="kitchen-deets-column">
        <p className="kitchen-name-text new-kitchen-d kitchen1" contentEditable="true"> Kitchen Name</p>
        <p className="a-little-bio new-kitchen-d kitchen1" contentEditable="true">
                    Description
        </p>
        <div className="edit-button-fade" id="kitchen1">
                      Save
        </div>
      </div>
    </div>
  </div>
);


const RenderUserBio = () => (
  <div className="show-user-profile">
    <img src="test.jpg" className="profile-picture-user" alt="" />
    <div className="user-text-details">
      <p className="user-name-text head1"> Hasstrup Ezekiel </p>
      <p className="user-email-text head1"> hasstrup.ezekiel@gmail.com</p>
      <p className="user-digits-text head1"> Add Kitchen </p>
      <p className="a-little-bio head1">
                  Bacon ipsum dolor amet doner fatback capicola salami jerky spare ribs andouille
                  frankfurter sausage chuck prosciutto. tip flank cow biltong porchetta.
      </p>
      <div className="edit-button-fade" id="head1">
                    Edit
      </div>
    </div>
  </div>
);

