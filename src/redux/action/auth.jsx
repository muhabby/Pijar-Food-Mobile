/* eslint-disable prettier/prettier */
import axios from 'axios';

const base_url = 'https://be-pijar-food.vercel.app';

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
    dispatch({type: 'AUTH_PENDING'});
    const res = await axios.post(base_url + '/auth/register', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log('data');
    console.log(data);
    console.log('res');
    console.log(res);
    dispatch({type: 'AUTH_SUCCESS', payload: res.data});
    navigation.navigate('Login');
  } catch (err) {
    console.log('err');
    console.log(err);
    console.log(err?.message ? err.message : err);
    dispatch({
      type: 'AUTH_ERROR',
      payload: err?.response?.data?.message ?? 'regist error',
    });
  }
};
