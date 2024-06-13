/* eslint-disable prettier/prettier */
import axios from 'axios';
import {BASE_URL} from '@env';

const base_url = BASE_URL;

export const getUsers = id => async (dispatch, getState) => {
  try {
    dispatch({type: 'USERS_DETAIL_PENDING'});

    const res = await axios.get(`${base_url}/users/${id}`);

    console.log('res');
    console.log(res);
    dispatch({type: 'USERS_DETAIL_SUCCESS', payload: res.data.data});
  } catch (err) {
    console.log(err?.message ? err.message : err);
    dispatch({type: 'USERS_DETAIL_ERROR'});
  }
};

export const updateUsers = (data, navigation) => async (dispatch, getState) => {
  try {
    dispatch({type: 'USERS_UPDATE_PENDING'});
    let token = getState().auth.data.token;

    const res = await axios.put(base_url + '/users', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('res');
    console.log(res);
    dispatch({type: 'USERS_UPDATE_SUCCESS', payload: res.data.data});

    navigation.navigate('Profile');
  } catch (err) {
    console.log('err');
    console.log(err);
    console.log(err?.message ? err.message : err);
    dispatch({
      type: 'USERS_UPDATE_ERROR',
      payload: err?.response?.data?.message ?? 'update users error',
    });
  }
};

export const clearErrorUpdateUsers = () => async (dispatch, getState) => {
  try {
    dispatch({type: 'USERS_UPDATE_RESET'});
  } catch (err) {
    console.log(err?.message ? err.message : err);
  }
};
