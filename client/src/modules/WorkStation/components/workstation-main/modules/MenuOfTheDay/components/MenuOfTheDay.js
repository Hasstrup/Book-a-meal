import React from 'react';

const nameInput = React.createRef();
const descriptionInput = React.createRef();

const generateNames = (args) => {
  if (!args) return '';
  const list = args.reduce((accumulator, item) => `${accumulator.name ? accumulator.name : accumulator }, ${item.name}`);
  if (list.split(' ').length <= 15) return list;
  return `${list.split(' ').splice(0, 15).join(' ')}...`;
};
export default ({
  handleClick, buttonText, ofTheDay, openModal, previewImage
}) => (
  <div className="menu-of-the-day">
    <div className="announce-item item-motd">
      <p className="announce-item-key motd-main"> Menu of the day </p>
      <p className="announce-item-description motd-description">
               Here are some insights on how you've fared
               today and generally how well you've done so far
               with us! Enjoy
      </p>
    </div>
    <div className="menu-of-the-day-details item-details-def">
      <div className="menu-of-the-day-main">
        <img className="small-avatar" src={previewImage} />
        <div className="motd-card-def">
          <p className="motd-name motd1" ref={nameInput}> { ofTheDay && ofTheDay.name ? ofTheDay.name : 'Good Morning Burrito' } </p>
          {
                    ofTheDay && ofTheDay.Meals ?
                      <p className="motd-items motd1">{ generateNames(ofTheDay.Meals) }<span className="motd-count"> {`(${ofTheDay.Meals.length})`} </span></p>
                    : <p className="motd-items motd1" style={{ textDecoration: 'underline' }} onClick={openModal}> Click here to select meal options </p>
                }

          <p className="motd-desc motd1" ref={descriptionInput}>
            { ofTheDay && ofTheDay.description ? ofTheDay.description : 'Describe your menu here. This description will be seen by everyone who comes acros this menu on the application, so remember to make it super nice :)' }
          </p>
        </div>
      </div>
      <div className="motd-edit edit-button" id="motd1" onClick={handleClick}>
        { buttonText }
      </div>
    </div>
  </div>
);
// Hopefully this works;
export { nameInput, descriptionInput };
