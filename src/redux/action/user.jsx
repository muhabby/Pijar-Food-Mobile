/* eslint-disable prettier/prettier */
import axios from 'axios';

const base_url = 'https://be-pijar-food.vercel.app';

export const getUserById = id => async (dispatch, getState) => {
  try {
    dispatch({type: 'GET_USER_PENDING'});

    const res = await axios.get(`${base_url}/users/${id}`);
    console.log('res user');
    console.log(res);

    dispatch({type: 'GET_USER_SUCCESS', payload: res.data.data});
  } catch (err) {
    console.log(err?.message ? err.message : err);
    dispatch({type: 'GET_USER_ERROR'});
  }
};
