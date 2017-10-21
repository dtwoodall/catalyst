import * as schedulerAPI from '../utilities/schedulerAPI';
import {push} from 'react-router-redux';
import {schema} from 'normalizr';
import {categorySchema} from './categories';

export const statuses = {
  'Not started': {
    name: 'Not started',
    icon: 'inbox'
  },
  'In progress': {
    name: 'In progress',
    icon: 'timelapse'
  },
  'On hold': {
    name: 'On hold',
    icon: 'warning'
  },
  'Completed': {
    name: 'Completed',
    icon: 'check'
  },
  'Cancelled': {
    name: 'Cancelled',
    icon: 'cancel'
  }
};

// Tasks reducer
export default (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TASKS':
    case 'UPDATE_TASK':
    case 'ADD_TASK':
      return {
        ...state,
        ...action.tasks
      };
    default:
      return state;
  }
};


// Task schema
export const taskSchema = new schema.Entity('tasks', { 
  category: categorySchema
});

taskSchema.define({parent: taskSchema, subtasks: [taskSchema]});


// Tasks selectors
export const getRootTasks = state => (
  Object.values(state).filter(task => (task.parentId === null))
);

export const getRootTasksByCategoryId = (state, categoryId) => (
  getRootTasks(state).filter(task => (task.categoryId === categoryId))
);

export const getTaskById = (state, id) => state[id];

export const getChildTasksByParentId = (state, id) => (
  Object.values(state).filter(task => (task.parentId === id))
);


// Tasks action creators
export const updateTask = (task) => ({
  type: 'UPDATE_TASK',
  tasks: {[task.id]: task}
});

export const fetchTasks = () => dispatch => {

  dispatch({type: 'FETCH_TASKS'});

  schedulerAPI.getTasks().then(payload => {
    dispatch({
      type: 'RECEIVE_TASKS',
      tasks: payload.entities.tasks
    });
    dispatch({
      type: 'RECEIVE_CATEGORIES',
      categories: payload.entities.categories
    });
  }).catch((err) => console.log(err));

}

export const fetchTaskById = taskId => dispatch => {

  dispatch({type: 'FETCH_TASKS'});

  schedulerAPI.getTaskById(taskId).then(payload => {
    dispatch({
      type: 'RECEIVE_TASKS',
      tasks: payload.entities.tasks
    });
    dispatch({
      type: 'RECEIVE_CATEGORIES',
      categories: payload.entities.categories
    });
  }).catch((err) => console.log(err));

}

export const fetchTasksByCategoryId = categoryId => dispatch => {

  dispatch({type: 'FETCH_TASKS'});

  schedulerAPI.getTasksByCategoryId(categoryId).then(payload => {
    dispatch({
      type: 'RECEIVE_TASKS',
      tasks: payload.entities.tasks
    });
  }).catch((err) => console.log(err));

}

export const sendTask = task => dispatch => {

  schedulerAPI.updateTask(task).then(payload => {
    dispatch({
      type: 'UPDATE_TASK',
      tasks: payload.entities.tasks
    })
  }).catch((err) => console.log(err));

}

export const createTask = task => dispatch => {

  schedulerAPI.createTask(task).then(payload => {
    dispatch({
      type: 'ADD_TASK',
      tasks: payload.entities.tasks
    })
    dispatch(push(`/tasks/${payload.result}`));
  }).catch((err) => console.log(err));

}