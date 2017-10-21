// Initial state definition
const initialState = {
  open: false
};


// Status Select Dialog reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_STATUS_SELECT_DIALOG':
      return {
        ...state,
        open: true
      };
    case 'CLOSE_STATUS_SELECT_DIALOG':
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
};


// Status Select Dialog selectors
export const getIsStatusSelectDialogOpen = (state) => state.open;


// Status Select Dialog action creators
export const openStatusSelectDialog = () => ({
  type: 'OPEN_STATUS_SELECT_DIALOG'
});

export const closeStatusSelectDialog = () => ({
  type: 'CLOSE_STATUS_SELECT_DIALOG'
});
