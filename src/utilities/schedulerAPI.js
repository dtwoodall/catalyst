import axios from 'axios';
import {normalize} from 'normalizr';
import {taskSchema} from '../modules/tasks';
import {categorySchema} from '../modules/categories';
import {getAccessToken, isTokenExpired, logout} from './authentication';
import store from '../store';

const schedulerAPI = axios.create({baseURL: (
  process.env.NODE_ENV === 'production' ? 'https://dt-catalyst-api.herokuapp.com/' : 'http://localhost:5000/'
)});

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
export const getTasksByCategoryId = categoryId => simpleAPICall('get', `categories/${categoryId}/tasks`, [taskSchema]);
export const createTask = task => simpleAPICall('post', 'tasks', taskSchema, task);
export const updateTask = task => simpleAPICall('post', `tasks/${task.id}`, taskSchema, task);

export const getCategories = () => simpleAPICall('get', 'categories', [categorySchema]);
export const getCategoryById = categoryId => simpleAPICall('get', `categories/${categoryId}`, categorySchema);
export const createCategory = category => simpleAPICall('post', 'categories', categorySchema, category);
export const updateCategory = category => simpleAPICall('post', `categories/${category.id}`, categorySchema, category);