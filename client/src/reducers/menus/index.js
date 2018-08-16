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
