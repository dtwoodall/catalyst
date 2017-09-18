import * as schedulerAPI from '../utilities/schedulerAPI';
import { schema } from 'normalizr';
import taskSchema from './tasks';

// Categories reducer
export default (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_CATEGORIES':
      return {
        ...state,
        ...action.categories
      };
    default:
      return state;
  }
};


// Category schema
export const categorySchema = new schema.Entity('categories', {
  tasks: [taskSchema]
});


// Category selectors
export const getCategories = state => state;

export const getCategoryById = (state, id) => state[id];


// Category action creators
export const fetchCategories = () => dispatch => {

  dispatch({type: 'FETCH_CATEGORIES'});

  schedulerAPI.getCategories().then(payload => {
    dispatch({
      type: 'RECEIVE_CATEGORIES',
      categories: payload.entities.categories
    });
  }).catch((err) => console.log(err));

}

export const fetchCategoryById = categoryId => dispatch => {

  dispatch({type: 'FETCH_CATEGORIES'});

  schedulerAPI.getCategoryById(categoryId).then(payload => {
    dispatch({
      type: 'RECEIVE_CATEGORIES',
      categories: payload.entities.categories
    });
  }).catch((err) => console.log(err));

}