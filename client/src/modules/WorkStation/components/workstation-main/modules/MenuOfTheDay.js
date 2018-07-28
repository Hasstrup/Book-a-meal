import React from 'react';

export default () => (
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
        <img className="small-avatar" src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c75e0437e819afdceeb3050a6bcdd71b&auto=format&fit=crop&w=653&q=80" />
        <div className="motd-card-def">
          <p className="motd-name motd1"> Good morning burrito </p>
          <p className="motd-items motd1"> Freid rice & chips, Sweet Sensation <span className="motd-count"> (30) </span></p>
          <p className="motd-desc motd1">
              Bacon ipsum dolor amet doner fatback capicola salami jerky spare ribs andouille
              frankfurter sausage chuck prosciutto. tip flank cow biltong porchetta.
            </p>
        </div>
      </div>
      <div className="motd-edit edit-button" id="motd1" onClick="makeEditable('motd1', 'b')">
         Change
      </div>
    </div>
  </div>
);
