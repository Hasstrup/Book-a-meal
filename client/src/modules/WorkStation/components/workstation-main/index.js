import React from 'react';
import RenderOverView from './modules/overview';
import MealDetailsMain from '../meals';
import RenderOrderHistory from '../orders'
import MenuOfTheDay from './modules/MenuOfTheDay';

export default () => (
  <div className="main-workstation">
    {/* this announces the workstation */}
    <div className="announce-workstation">
      <p className="announce-workstation-title"> Workstation </p>
      <p className="announce-workstation-desc"> Control center for Hello Desi Kitchen</p>
    </div>
    <div className="main-workstation-main">
      <RenderOverView />
      <MenuOfTheDay />
      <MealDetailsMain />
      <RenderOrderHistory />
    </div>
  </div>
);

