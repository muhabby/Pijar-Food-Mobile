/* eslint-disable prettier/prettier */
const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: null,
};

const authRegistReducers = (state = initialState, action) => {
  if (action.type === 'AUTH_REGIST_PENDING') {
    return {
      ...state,
      data: null,
      isError: false,
      isSuccess: false,
      isLoading: true,
      errorMessage: null,
    };
  } else if (action.type === 'AUTH_REGIST_SUCCESS') {
    return {
      ...state,
      data: action.payload,
      isError: false,
      isSuccess: true,
      isLoading: false,
      errorMessage: null,
    };
  } else if (action.type === 'AUTH_REGIST_ERROR') {
    return {
      ...state,
      data: null,
      isError: true,
      isSuccess: false,
      isLoading: false,
      errorMessage: action.payload,
    };
  } else {
    return state;
  }
};

export default authRegistReducers;
