/* eslint-disable prettier/prettier */
const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: null,
};

const menuDeleteReducers = (state = initialState, action) => {
  if (action.type === 'DELETE_MENU_PENDING') {
    return {
      ...state,
      data: null,
      isError: false,
      isSuccess: false,
      isLoading: true,
      errorMessage: null,
    };
  } else if (action.type === 'DELETE_MENU_SUCCESS') {
    return {
      ...state,
      data: action.payload,
      isError: false,
      isSuccess: true,
      isLoading: false,
      errorMessage: null,
    };
  } else if (action.type === 'DELETE_MENU_ERROR') {
    return {
      ...state,
      data: null,
      isError: true,
      isSuccess: false,
      isLoading: false,
      errorMessage: action.payload,
    };
  } else if (action.type === 'DELETE_MENU_RESET') {
    return {
      ...state,
      data: null,
      isError: false,
      isSuccess: false,
      isLoading: false,
      errorMessage: null,
    };
  } else {
    return state;
  }
};

export default menuDeleteReducers;
