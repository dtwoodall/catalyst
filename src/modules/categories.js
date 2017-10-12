import * as schedulerAPI from '../utilities/schedulerAPI';
import {push} from 'react-router-redux';
import {schema} from 'normalizr';

// Categories reducer
export default (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_CATEGORIES':
    case 'UPDATE_CATEGORY':
    case 'ADD_CATEGORY':
      return {
        ...state,
        ...action.categories
      };
    default:
      return state;
  }
};


// Category schema
export const categorySchema = new schema.Entity('categories');


// Category selectors
export const getCategories = state => state;

export const getCategoryById = (state, id) => state[id];


// Category action creators
export const updateCategory = (category) => ({
  type: 'UPDATE_CATEGORY',
  categories: {[category.id]: category}
});

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

export const sendCategory = category => dispatch => {

  schedulerAPI.updateCategory(category).then(payload => {
    dispatch({
      type: 'UPDATE_CATEGORY',
      categories: payload.entities.categories
    })
  }).catch((err) => console.log(err));

}

export const createCategory = category => dispatch => {

  schedulerAPI.createCategory(category).then(payload => {
    dispatch({
      type: 'ADD_CATEGORY',
      categories: payload.entities.categories
    })
    dispatch(push(`/categories/${payload.result}`));
  }).catch((err) => console.log(err));

}