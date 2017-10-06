// Initial state definition
const initialState = {
  open: false
};


// Category Select Dialog reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_CATEGORY_SELECT_DIALOG':
      return {
        ...state,
        open: true
      };
    case 'CLOSE_CATEGORY_SELECT_DIALOG':
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
};


// Category Select Dialog selectors
export const getIsCategorySelectDialogOpen = (state) => state.open;


// Category Select Dialog action creators
export const openCategorySelectDialog = () => ({
  type: 'OPEN_CATEGORY_SELECT_DIALOG'
});

export const closeCategorySelectDialog = () => ({
  type: 'CLOSE_CATEGORY_SELECT_DIALOG'
});
