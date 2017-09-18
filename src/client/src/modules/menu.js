import {LOCATION_CHANGE} from 'react-router-redux';

// Initial state definition
const initialState = {
  open: false
};


// Menu reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_MENU':
      return {
        ...state,
        open: true
      };
    case LOCATION_CHANGE:
    case 'CLOSE_MENU':
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
};


// Menu selectors
export const getIsMenuOpen = (state) => state.open;


// Menu action creators
export const openMenu = () => ({
  type: 'OPEN_MENU'
});

export const closeMenu = () => ({
  type: 'CLOSE_MENU'
});