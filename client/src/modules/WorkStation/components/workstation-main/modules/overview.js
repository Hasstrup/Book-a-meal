import React from 'react';

export default () => (
  <div className="overview">
      <div className="announce-item item-overview">
        <p className="announce-item-key overview-main"> Overview </p>
        <p className="announce-item-description overview-description">
              Here are some insights on how you've fared
              today, it updates real time, so best believe we've got you!
              Enjoy
        </p>
      </div>
      <div className="main-overview-card-stack">
        <div className="overview-c today-overview">

          <div className="overview-c-grid">

            <div className="overview-c-grid-element">
              <p className="oc-grid-item-key"> Revenue </p>
              <p className="oc-grid-item-value"> N2000</p>
            </div>

            <div className="overview-c-grid-element">
              <p className="oc-grid-item-key"> Orders </p>
              <p className="oc-grid-item-value"> 34 </p>
            </div>

            <div className="overview-c-grid-element">
              <p className="oc-grid-item-key"> Unprocessed </p>
              <p className="oc-grid-item-value"> 12 </p>
            </div>

            <div className="overview-c-grid-element">
              <p className="oc-grid-item-key"> Top Selling </p>
              <p className="oc-grid-item-value"> Hello lagos</p>
            </div>

            <div className="overview-c-grid-element">
              <p className="oc-grid-item-key"> Impressions </p>
              <p className="oc-grid-item-value"> 4000 </p>
            </div>

            <div className="overview-c-grid-element">
              <p className="oc-grid-item-key"> Subscribers </p>
              <p className="oc-grid-item-value"> 10</p>
            </div>

          </div>
        </div>
      </div>
    </div>

);

