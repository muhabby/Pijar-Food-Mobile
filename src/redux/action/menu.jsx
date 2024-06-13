/* eslint-disable prettier/prettier */
import axios from 'axios';
import {BASE_URL} from '@env';

const base_url = BASE_URL;

export const getMenu = () => async (dispatch, getState) => {
  try {
    dispatch({type: 'GET_MENU_PENDING'});

    const res = await axios.get(base_url + '/recipe');
    console.log('res');
    console.log(res);

    dispatch({type: 'GET_MENU_SUCCESS', payload: res.data.data});
  } catch (err) {
    console.log(err?.message ? err.message : err);
    dispatch({type: 'GET_MENU_ERROR'});
  }
};

export const postMenu = (data, navigation) => async (dispatch, getState) => {
  try {
    dispatch({type: 'POST_MENU_PENDING'});
    let token = getState().auth.data.token;

    const res = await axios.post(base_url + '/recipe', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('res');
    console.log(res);
    dispatch({type: 'POST_MENU_SUCCESS', payload: res.data});

    navigation.navigate('HomeScreen');
  } catch (err) {
    console.log('err');
    console.log(err);
    console.log(err?.message ? err.message : err);
    dispatch({
      type: 'POST_MENU_ERROR',
      payload:
        err?.response?.data?.message ??
        'Input invalid, please fill in all data',
    });
  }
};

export const deleteMenu = (id, navigation) => async (dispatch, getState) => {
  try {
    dispatch({type: 'DELETE_MENU_PENDING'});
    let token = getState().auth.data.token;

    const res = await axios.delete(`${base_url}/recipe/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({type: 'DELETE_MENU_SUCCESS', payload: res.data});
    navigation.goBack();
  } catch (err) {
    console.log(err?.message ? err.message : err);
    // dispatch({ type: 'DELETE_MENU_ERROR' });
    dispatch({
      type: 'DELETE_MENU_ERROR',
      payload: err?.response?.data?.message ?? 'delete menu error',
    });
  }
};

export const getMenuDetail = id => async (dispatch, getState) => {
  try {
    dispatch({type: 'GET_MENU_DETAIL_PENDING'});

    const res = await axios.get(`${base_url}/recipe/${id}`);
    console.log('res');
    console.log(res);

    dispatch({type: 'GET_MENU_DETAIL_SUCCESS', payload: res.data.data});
  } catch (err) {
    console.log(err?.message ? err.message : err);
    dispatch({type: 'GET_MENU_DETAIL_ERROR'});
  }
};

export const updateMenu =
  (id, data, navigation) => async (dispatch, getState) => {
    try {
      dispatch({type: 'UPDATE_MENU_PENDING'});
      let token = getState().auth.data.token;

      const res = await axios.put(base_url + '/recipe/' + id, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('res');
      console.log(res);

      dispatch({type: 'UPDATE_MENU_SUCCESS', payload: res.data});
      navigation.goBack();
    } catch (err) {
      console.log('err');
      console.log(err);
      console.log(err?.message ? err.message : err);
      dispatch({
        type: 'UPDATE_MENU_ERROR',
        payload: err?.response?.data?.message ?? 'update menu error',
      });
    }
  };

export const getMenuUserId = user_id => async (dispatch, getState) => {
  try {
    dispatch({type: 'GET_MENU_USER_PENDING'});

    const res = await axios.get(`${base_url}/recipe/user/${user_id}`);
    console.log('res');
    console.log(res);

    dispatch({type: 'GET_MENU_USER_SUCCESS', payload: res.data.data});
  } catch (err) {
    console.log(err?.message ? err.message : err);
    dispatch({type: 'GET_MENU_USER_ERROR'});
  }
};

export const searchMenu =
  (search, searchBy, page) => async (dispatch, getState) => {
    try {
      dispatch({type: 'SEARCH_MENU_PENDING'});

      const res = await axios.get(
        `${base_url}/recipe/detail?search=${search}&searchBy=${searchBy}&sortBy=created_at&sort=DESC&limit=100&page=${page}`,
      );

      // console.log("res");
      // console.log(res);
      dispatch({type: 'SEARCH_MENU_SUCCESS', payload: res.data.data});
    } catch (err) {
      console.log(err?.message ? err.message : err);
      dispatch({type: 'SEARCH_MENU_ERROR'});
    }
  };

export const listDessert = () => async (dispatch, getState) => {
  try {
    dispatch({type: 'SEARCH_MENU_PENDING'});

    const res = await axios.get(
      `${base_url}/recipe/detail?search=Dessert&searchBy=category.name&sortBy=created_at&sort=DESC&limit=100&page=1`,
    );

    // console.log("res");
    // console.log(res);
    dispatch({type: 'SEARCH_MENU_SUCCESS', payload: res.data.data});
  } catch (err) {
    console.log(err?.message ? err.message : err);
    dispatch({type: 'SEARCH_MENU_ERROR'});
  }
};

export const listMainCourse = () => async (dispatch, getState) => {
  try {
    dispatch({type: 'SEARCH_MENU_PENDING'});

    const res = await axios.get(
      `${base_url}/recipe/detail?search=Main&searchBy=category.name&sortBy=created_at&sort=DESC&limit=100&page=1`,
    );

    // console.log("res");
    // console.log(res);
    dispatch({type: 'SEARCH_MENU_SUCCESS', payload: res.data.data});
  } catch (err) {
    console.log(err?.message ? err.message : err);
    dispatch({type: 'SEARCH_MENU_ERROR'});
  }
};

export const listAppetizer = () => async (dispatch, getState) => {
  try {
    dispatch({type: 'SEARCH_MENU_PENDING'});

    const res = await axios.get(
      `${base_url}/recipe/detail?search=Appetizer&searchBy=category.name&sortBy=created_at&sort=DESC&limit=100&page=1`,
    );

    // console.log("res");
    // console.log(res);
    dispatch({type: 'SEARCH_MENU_SUCCESS', payload: res.data.data});
  } catch (err) {
    console.log(err?.message ? err.message : err);
    dispatch({type: 'SEARCH_MENU_ERROR'});
  }
};

export const clearErrorPostMenu = () => async (dispatch, getState) => {
  try {
    dispatch({type: 'POST_MENU_RESET'});
  } catch (err) {
    console.log(err?.message ? err.message : err);
  }
};
