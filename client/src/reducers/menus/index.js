const menuReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CATALOGUE_FETCHED':
      return { ...state, catalog: action.payload };

    case 'MENU_SELECTED':
      return { ...state, target: action.payload };

    default:
      return state;
  }
};

export default menuReducer;
