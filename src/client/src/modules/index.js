import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import menu, * as fromMenu from './menu';
import tasks, * as fromTasks from './tasks';
import newTask, * as fromNewTask from './newTask';
import categories, * as fromCategories from './categories';

// Root reducer
export default combineReducers({
  router: routerReducer,
  menu,
  tasks,
  newTask,
  categories
});

// Root selectors
export const getIsMenuOpen = state => fromMenu.getIsMenuOpen(state.menu);

export const getRootTasks = state => fromTasks.getRootTasks(state.tasks);

export const getRootTasksByCategoryId = (state, categoryId) => fromTasks.getRootTasksByCategoryId(state.tasks, categoryId);

export const getTaskById = (state, id) => fromTasks.getTaskById(state.tasks, id);

export const getNewTask = state => fromNewTask.getNewTask(state.newTask);

export const getChildTasksByParentId = (state, id) => fromTasks.getChildTasksByParentId(state.tasks, id);

export const getCategories = state => fromCategories.getCategories(state.categories);

export const getCategoryById = (state, id) => fromCategories.getCategoryById(state.categories, id);