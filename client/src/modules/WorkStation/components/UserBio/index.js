import React from 'react';

export default ({ user, handleChange, handleSubmit }) => (
  <div className="show-user-and-kitchen-profile">
    <RenderUserBio user={user} />
    <SetUpNewKitchen handleChange={handleChange} handleSubmit={handleSubmit} />
    <RenderKitchenProfileMain kitchen={user.Kitchen} />
  </div>
);

const SetUpNewKitchen = ({ handleChange, handleSubmit }) => (
  <div className="show-kitchen-profile new-kitchen">
    <div className="kitchen-text-details">
      <img src="test.jpg" className="profile-picture-kitchen" alt="" />
      <div className="kitchen-deets-column">
        <p className="kitchen-name-text new-kitchen-d kitchen1" contentEditable="true"> Kitchen Name</p>
        <p className="a-little-bio new-kitchen-d kitchen1" contentEditable="true" onChange={(e) => { console.log(e); handleChange(e, 'description')}}>
                    Description
        </p>
        <div className="edit-button-fade" id="kitchen1" onClick={() => { handleSubmit(1) }}>
                      Save
        </div>
      </div>
    </div>
  </div>
);

const RenderKitchenProfileMain = ({ kitchen }) => (
  <div className='show-kitchen-profile'>
    <div className='kitchen-text-details'>
    <img src='https://images.unsplash.com/photo-1428515613728-6b4607e44363?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9571e7dfc1016803908833844646dbb3&auto=format&fit=crop&w=1950&q=80' className='profile-picture-kitchen'/>
    <div className='kitchen-deets-column'>
        <p className='kitchen-name-text kitchen1'> { kitchen.name } </p>
        <p className='a-little-bio kitchen1'>
          { kitchen.description }
        </p>
        <div className='edit-button-fade' id='kitchen1' onClick="makeEditable('kitchen1')">
            Edit
          </div>
      </div>
  </div>
  </div>
)

const RenderUserBio = ({ user }) => (
  <div className="show-user-profile">
    <img src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3273c6fd0fbb1cba4fc73f6b6ebaa502&auto=format&fit=crop&w=1950&q=80" className="profile-picture-user" alt="" />
    <div className="user-text-details">
      <p className="user-name-text head1"> {user.firstname} {user.lastname || '' } </p>
      <p className="user-email-text head1"> {user.email}</p>
      {/* TODO: dynamically render this variant on the presence/absence of a kitchen */}
      <p className="user-digits-text head1" onClick={() => { RenderNewKitchen() }}> Add Kitchen </p>
      <p className="a-little-bio head1">
        {user.bio || 'This is your control center, here you edit relevant information about yourself and your kitchen.'}
      </p>
      <div className="edit-button-fade" id="head1">
                    Edit
      </div>
    </div>
  </div>
);

/**
 *
 */
const RenderNewKitchen = () => {
  document.getElementsByClassName('new-kitchen')[0].style.display = 'flex';
};

