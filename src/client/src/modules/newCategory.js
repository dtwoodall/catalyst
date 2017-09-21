import * as schedulerAPI from '../utilities/schedulerAPI';

// New Category reducer
export default (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_NEW_CATEGORY':
      return {...action.category};
    case 'ADD_CATEGORY':
      return {};
    default:
      return state;
  }
};


// New Category selectors
export const getNewCategory = state => state;


// New Category action creators
export const updateNewCategory = category => ({
  type: 'UPDATE_NEW_CATEGORY',
  category
});

export const createCategory = category => dispatch => {

  schedulerAPI.createCategory(category).then(payload => {
    dispatch({
      type: 'ADD_CATEGORY',
      tasks: payload.entities.categories
    })
  }).catch((err) => console.log(err));

}