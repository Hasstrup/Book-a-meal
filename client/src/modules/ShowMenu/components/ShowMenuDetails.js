import React from 'react';
import SingleMealCard from '../../../mixins/cards/singleMeal';
import { RenderMealCard } from '../../WorkStation/utils';

export default ({ meals }) => (
  <section className="main-meal-list">
    <Preamble />
    <div className="main-menu-options-list">
      { meals && meals.length && meals.map(meal => <MealPreviewSingle key={`meal-${meal.id}`} meal={meal} />)}
    </div>
  </section>
);

const Preamble = () => (
  <div className="main-meal-pointers">
    <p className="items-pointer"> Items </p>
    <p className="hover-pointer"> click on each item to get details </p>
  </div>
);

const MealPreviewSingle = ({ meal }) => (
  <div
    className="hover-item"
    onClick={() => { RenderMealCard(meal.id); }}
  >
    <div className="hover-item-list">
      <p name="item-3" className="hover-item-items"> { meal.name }</p>
      <p className="hover-item-price"> N{meal.price}</p>
      <SingleMealCard meal={meal} />
    </div>
  </div>
);
