/* eslint-disable prettier/prettier */
const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: null,
};

const menuUpdateReducers = (state = initialState, action) => {
  if (action.type === 'UPDATE_MENU_PENDING') {
    return {
      ...state,
      data: null,
      isError: false,
      isSuccess: false,
      isLoading: true,
      errorMessage: null,
    };
  } else if (action.type === 'UPDATE_MENU_SUCCESS') {
    return {
      ...state,
      data: action.payload,
      isError: false,
      isSuccess: true,
      isLoading: false,
      errorMessage: null,
    };
  } else if (action.type === 'UPDATE_MENU_ERROR') {
    return {
      ...state,
      data: null,
      isError: true,
      isSuccess: false,
      isLoading: false,
      errorMessage: action.payload,
    };
  } else if (action.type === 'UPDATE_MENU_RESET') {
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

export default menuUpdateReducers;
