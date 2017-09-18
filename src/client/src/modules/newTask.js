import * as schedulerAPI from '../utilities/schedulerAPI';

// New Task reducer
export default (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_NEW_TASK':
      return action.task;
    case 'ADD_TASK':
      return {};
    default:
      return state;
  }
};


// New Task selectors
export const getNewTask = state => state;


// Tasks action creators
export const updateNewTask = task => ({
  type: 'UPDATE_NEW_TASK',
  task
});

export const createTask = task => dispatch => {

  schedulerAPI.createTask(task).then(payload => {
    dispatch({
      type: 'ADD_TASK',
      tasks: payload.entities.tasks
    })
  }).catch((err) => console.log(err));

}