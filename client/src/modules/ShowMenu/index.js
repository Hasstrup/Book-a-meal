import React from 'react';
import ShowMenuDetails from './components/ShowMenuDetails';
import VendorDetails from './components/VendorDetails';
import '../styles/menu.scss';

export default () => (
  <div className="main-menu-page-body">
    <VendorDetails />
    <ShowMenuDetails />
  </div>
);

