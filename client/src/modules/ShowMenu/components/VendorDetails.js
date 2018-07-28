import React from 'react';

export default () => (
  <div className="menu-title-and-owner-grid">
    <div className="content-details">
      <img src="https://images.unsplash.com/photo-1504113888839-1c8eb50233d3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d7d856d142419fe0000798f4928aa7b2&auto=format&fit=crop&w=1015&q=80" className="content-avatar" alt="menuImage" />
      <div className="menu-details">
        <p className="menu-det-name"> A super awesome menu </p>
        <p className="menu-det-details">
           Bacon ipsum dolor amet doner fatback capicola salami jerky spare ribs andouille
           frankfurter sausage chuck prosciutto. Hamburger beef ribs chuck boudin burgdoggen,
           salami flank ham hock fatback ribeye to
        </p>
      </div>
    </div>

    <div className="vendor-details-def">
      <p className="announce-vendor"> Vendor </p>
      <div className="vendor-details-main">
        <img src="https://images.unsplash.com/photo-1505870448719-02104776482b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3cfc2915c5fa5748e5d6017c3d0ab41e&auto=format&fit=crop&w=1100&q=80" className="content-avatar" alt="vendorImage" />
        <div className="vendor-details-brief">
          <p className="vendor-details-name"> Native Kitchen </p>
          <p className="vendor-details-bio-brief">
                Bacon ipsum dolor amet doner fatback capicola salami jerky spare ribs andouille
                frankfurter sausage chuck prosciutto. tip flank cow biltong porchetta.
          </p>
        </div>
      </div>
      <p className="subscribe-button"> Subscribe </p>
    </div>
  </div>
);
