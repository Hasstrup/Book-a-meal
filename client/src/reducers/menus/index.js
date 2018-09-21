/**
 * @name menuReducer
 * @param {object} state The current state ofg the application
 * @param {object} action The action being propagated along the event chain
 * @returns {object}
 */
const menuReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CATALOGUE_FETCHED':
      return { ...state, catalog: action.payload };

    case 'TARGET_MENU_FETCHED':
      return { ...state, target: action.payload };

    case 'MENU_OF_THE_DAY':
      return { ...state, ofTheDay: action.payload };

    default:
      return state;
  }
};

export default menuReducer;
