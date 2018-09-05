import React from 'react';

export default ({ user, kitchen, handleChange, target }) => {
  const toggleOptions = (key) => document.getElementsByClassName('display-current-user')[0].style.display = key;
 return (
    <div className="orders-page-side-one">
        <div className="orders-heading-and-desc">
          <p className="orders-page-heading"> Orders </p>
          <p className="orders-page-desc">
            This is a page dedicated for you
            to manage your orders as a regular
            user or as a vendor. You can check your
            monitor the current items in cart
            and check with your previous order history.
            Enjoy!
          </p>
        </div>
        <div className="convey-account-details">
          <p className="convey-account-order">
             You are currently viewing this page as <br />
            <span id="user-details-init">{ target && (target.name || target.firstname)} </span> <br />
          </p>
          <div className="display-click-message">
            <p onClick={() => toggleOptions('flex')}> Click to switch account </p>
            <div className="display-current-user">
              {kitchen && <div className="user-list-item" onClick={() => { toggleOptions('none'); handleChange({ ...kitchen, type: 'kitchen' }); }}>{kitchen.name}</div>}
              {user && <div className="user-list-item" onClick={() => { toggleOptions('none'); handleChange({ ...user, type: 'user' }); }}>{`${user.firstname}${user.lastname || ''}`}</div>}
            </div>
          </div>
        </div>
      </div>
  );
}
