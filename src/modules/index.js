import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import menu, * as fromMenu from './menu';
import categorySelectDialog, * as fromCategorySelectDialog from './categorySelectDialog';
import statusSelectDialog, * as fromStatusSelectDialog from './statusSelectDialog';
import tasks, * as fromTasks from './tasks';
import newTask, * as fromNewTask from './newTask';
import categories, * as fromCategories from './categories';
import newCategory, * as fromNewCategory from './newCategory';

// Root reducer
export default combineReducers({
  router: routerReducer,
  menu,
  categorySelectDialog,
  statusSelectDialog,
  tasks,
  newTask,
  categories,
  newCategory
});

// Root selectors
export const getIsMenuOpen = state => fromMenu.getIsMenuOpen(state.menu);

export const getIsCategorySelectDialogOpen = state => fromCategorySelectDialog.getIsCategorySelectDialogOpen(state.categorySelectDialog);

export const getIsStatusSelectDialogOpen = state => fromStatusSelectDialog.getIsStatusSelectDialogOpen(state.statusSelectDialog);

export const getRootTasks = state => fromTasks.getRootTasks(state.tasks);

export const getRootTasksByCategoryId = (state, categoryId) => fromTasks.getRootTasksByCategoryId(state.tasks, categoryId);

export const getTaskById = (state, id) => fromTasks.getTaskById(state.tasks, id);

export const getNewTask = state => fromNewTask.getNewTask(state.newTask);

export const getChildTasksByParentId = (state, id) => fromTasks.getChildTasksByParentId(state.tasks, id);

export const getCategories = state => fromCategories.getCategories(state.categories);

export const getCategoryById = (state, id) => fromCategories.getCategoryById(state.categories, id);

export const getNewCategory = state => fromNewCategory.getNewCategory(state.newCategory);