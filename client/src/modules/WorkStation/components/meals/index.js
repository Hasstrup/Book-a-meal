import React from 'react';
import MealForm from '../../../../mixins/forms/MealForm';
import SingleMealCard from '../../../../mixins/cards/singleMeal';
import { RenderMealCard } from '../../utils';

const MealPreviewSingle = ({ meal }) => (
  <div className="menu-options-grid grid-item" onClick={() => { RenderMealCard(meal.id)}}>
    <p name="item-3" className="display-item-button"> { meal.name } <span> N{meal.price}</span></p>
    <SingleMealCard meal={meal} />
  </div>
);


export default ({ handleSubmit, meals }) => {
  const renderMeals = () => meals.map(meal => <MealPreviewSingle key={meal.id} meal={meal} />);
  return (
    <div className="menu-options-def">
      <div className="announce-item item-menu-options">
      <p className="announce-item-key motd-main"> Meal Options </p>
      <p className="announce-item-description motd-description">
                 Here are some insights on how you've fared
                 today and generally how well you've done so far
                 with us! Enjoy
      </p>
    </div>
      <div className="menu-options-comp-two">
      <div className="menu-options-grid list-grid">
        { /* TODO: render a component that says it's empty */}
        { meals && meals.length ? renderMeals() : null}
      </div>
      <MealForm />
      <div className="edit-button" id="show-menu" onClick={() => { handleSubmit(2) ;}}>
                  New meal
      </div>
    </div>
    </div>
  );
};
