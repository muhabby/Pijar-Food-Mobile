/* eslint-disable prettier/prettier */
import axios from 'axios';

const base_url = 'https://be-pijar-food.vercel.app';

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
      payload: err?.response?.data?.message ?? 'post menu error',
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

    dispatch({type: 'DELETE_MENU_SUCCESS', payload: res.data.data});
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
    dispatch({type: 'GET_MENU_PENDING'});

    const res = await axios.get(`${base_url}/recipe/user/${user_id}`);
    console.log('res');
    console.log(res);

    dispatch({type: 'GET_MENU_SUCCESS', payload: res.data.data});
  } catch (err) {
    console.log(err?.message ? err.message : err);
    dispatch({type: 'GET_MENU_ERROR'});
  }
};
