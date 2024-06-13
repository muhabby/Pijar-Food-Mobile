/* eslint-disable prettier/prettier */
import axios from 'axios';
import {BASE_URL} from '@env';

const base_url = BASE_URL;

export const authLogin = (data, navigate) => async (dispatch, getState) => {
  try {
    dispatch({type: 'AUTH_PENDING'});

    const res = await axios.post(base_url + '/auth/login', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('data');
    console.log(data);
    console.log('res');
    console.log(res);
    dispatch({type: 'AUTH_SUCCESS', payload: res.data});
  } catch (err) {
    console.log('err');
    console.log(err);
    console.log(err?.message ? err.message : err);
    dispatch({
      type: 'AUTH_ERROR',
      payload: err?.response?.data?.message ?? 'login error',
    });
  }
};

export const authLogout = () => async (dispatch, getState) => {
  dispatch({type: 'AUTH_LOGOUT'});
};

export const authRegist = (data, navigation) => async (dispatch, getState) => {
  try {
    dispatch({type: 'AUTH_REGIST_PENDING'});
    const res = await axios.post(base_url + '/auth/register', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log('data');
    console.log(data);
    console.log('res');
    console.log(res);
    dispatch({type: 'AUTH_REGIST_SUCCESS', payload: res.data});

    navigation.navigate('Login');
  } catch (err) {
    console.log('err');
    console.log(err);
    console.log(err?.message ? err.message : err);
    dispatch({
      type: 'AUTH_REGIST_ERROR',
      payload: err?.response?.data?.message ?? 'regist error',
    });
  }
};

export const changePassword =
  (data, navigation) => async (dispatch, getState) => {
    try {
      dispatch({type: 'UPDATE_AUTH_PENDING'});
      let token = getState().auth.data.token;

      const res = await axios.put(base_url + '/auth/resetPassword', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log('res');
      console.log(res);
      dispatch({type: 'UPDATE_AUTH_SUCCESS', payload: res.data});

      navigation.navigate('/login');
    } catch (err) {
      console.log('err');
      console.log(err);
      console.log(err?.message ? err.message : err);
      dispatch({
        type: 'UPDATE_AUTH_ERROR',
        payload: err?.response?.data?.message ?? 'update auth error',
      });
    }
  };
