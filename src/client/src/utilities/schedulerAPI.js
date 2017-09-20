import axios from 'axios';
import {normalize} from 'normalizr';
import {taskSchema} from '../modules/tasks';
import {categorySchema} from '../modules/categories';
import {getAccessToken, isTokenExpired, logout} from './authentication';
import store from '../store';

const schedulerAPI = axios.create({baseURL: 'http://localhost:5000/'});

const simpleAPICall = (method, url, schema, data) => {

  const accessToken = getAccessToken();

  let options = {};
  if (accessToken) {
    if (isTokenExpired(accessToken)) {
      return Promise.resolve(store.dispatch(logout()));
    }
    options = {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    };
  }

  return schedulerAPI[method](url, data ? data : options, options).then(response => normalize(response.data, schema));

};

export const getTasks = () => simpleAPICall('get', 'tasks', [taskSchema]);
export const getTaskById = taskId => simpleAPICall('get', `tasks/${taskId}`, taskSchema);
export const updateTask = task => simpleAPICall('post', `tasks/${task.id}`, taskSchema, task);
export const createTask = task => simpleAPICall('post', 'tasks', taskSchema, task);

export const getCategories = () => simpleAPICall('get', 'categories', [categorySchema]);
export const getCategoryById = categoryId => simpleAPICall('get', `categories/${categoryId}`, categorySchema);
export const createCategory = category => simpleAPICall('post', 'categories', categorySchema, category);