import React from 'react';


export default ({ handleClick, buttonText, ofTheDay, openModal, previewImage }) => {
    const nameInput = React.createRef();
    const description = React.createRef();
    return (
        <div className="menu-of-the-day">
          <div className="announce-item item-motd">
              <p className="announce-item-key motd-main"> Menu of the day </p>
              <p className="announce-item-description motd-description">
               Here are some insights on how you've fared
               today and generally how well you've done so far
               with us! Enjoy
            </p>
            </div>
          <div className="menu-of-the-day-details item-details-def" ref={nameInput}>
              <div className="menu-of-the-day-main">
              <img className="small-avatar" src={previewImage} />
              <div className="motd-card-def">
                <p className="motd-name motd1"> { ofTheDay && ofTheDay.name ? ofTheDay.name : 'Good Morning Burrito' } </p>
                {
                    ofTheDay && ofTheDay.meals ?
                    <p className="motd-items motd1"> Freid rice & chips, Sweet Sensation <span className="motd-count"> (30) </span></p>
                    : <p className="motd-items motd1" style={{ textDecoration: 'underline' }} onClick={openModal}> Click here to select meal options </p>
                }
                
                <p className="motd-desc motd1">
                    { ofTheDay && ofTheDay.description ? ofTheDay.description : 'Describe your menu here. This description will be seen by everyone who comes acros this menu on the application, so remember to make it super nice :)' }
                </p>
              </div>
            </div>
              <div className="motd-edit edit-button" id="motd1" onClick={handleClick}>
               { buttonText }
            </div>
            </div>
        </div> 
      )
}