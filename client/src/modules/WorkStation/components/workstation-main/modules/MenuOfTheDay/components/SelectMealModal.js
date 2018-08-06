import React from 'react';
import IteratorHelper from '../../../../../../../helpers/multiplier'; // Action at a distance?

const defaultImageUrl = 'https://images.unsplash.com/photo-1454334281609-87a89762912c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b94887cb7166b4f15e25c4e42956853c&auto=format&fit=crop&w=500&q=60';

const MealCardTiny = ({ data, handleSelect, selectedMeals }) => (
  <div className="tiny-tiny-card" onClick={() => { handleSelect(data) }}>
    <img src={data.image || defaultImageUrl} className="container-image" />
    <div className="containing-text it-3" style={selectedMeals.includes(data.id) ? { opacity: 1, height: '100%', backgroundColor: 'black', color: 'white' } : {}}>
        { data.name || ' '}
      </div>
  </div>
);

const SelectMealModal = ({ meals, isVisible, closeModal, handleSelect, selectedMeals  }) => {
  const renderMain = () => IteratorHelper(MealCardTiny)(meals)({ handleSelect, selectedMeals }); // handleClick should be very soon
  return (
    <div className="modal-base" style={{ display: isVisible ? 'flex' : 'none', zIndex: 20 }}>
        { /* Back Drop  */}
        <div className="main-modal-backdrop-ui" onClick={closeModal} />
        <div className="modal-content">
            { /* Select meals text */}
            <div className="content-head">
            <p className="content-head-1"> Select Meals </p>
            <div className="content-head-2" onClick={closeModal}> close </div>
          </div>
            <div className="main-modal-content">
            { meals && meals.length ? renderMain() : null }
          </div>
          </div>
      </div>
  );
};

export default SelectMealModal;
