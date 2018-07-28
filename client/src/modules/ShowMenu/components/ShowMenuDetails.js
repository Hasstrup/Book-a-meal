import React from 'react';

export default () => (
  <section className="main-meal-list">
    <Preamble />
    <div className="main-menu-options-list">
      <MenuSingleItem />
    </div>
  </section>
);

const Preamble = () => (
  <div className="main-meal-pointers">
    <p className="items-pointer"> Items </p>
    <p className="hover-pointer"> click on each item to get details </p>
  </div>
);

const MenuSingleItem = () => (
  <div className="hover-item">
    <div className="hover-item-list" >
      <p className="hover-item-items" name="item-2"> Bacon Cheese and Sandwich </p>
      <p className="hover-item-price"> N4000 </p>
    </div>
  </div>
);
