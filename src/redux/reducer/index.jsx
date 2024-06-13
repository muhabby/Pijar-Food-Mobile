/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import auth from './auth';
import menu_get from './menu_get';
import menu_post from './menu_post';
import menu_delete from './menu_delete';
import menu_detail from './menu_detail';
import menu_update from './menu_update';
import users_update from './users_update';
import users_detail from './users_detail';
import menu_user from './menu_user';
import menu_search from './menu_search';
import auth_regist from './auth_regist';

const rootReducer = combineReducers({
  auth,
  menu_get,
  menu_post,
  menu_delete,
  menu_detail,
  menu_update,
  users_update,
  users_detail,
  menu_user,
  menu_search,
  auth_regist,
});

export default rootReducer;
