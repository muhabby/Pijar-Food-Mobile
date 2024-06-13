/* eslint-disable prettier/prettier */
const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

const menuUserReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MENU_USER_PENDING':
      return {
        ...state,
        data: null,
        isError: false,
        isSuccess: false,
        isLoading: true,
      };
    case 'GET_MENU_USER_SUCCESS':
      return {
        ...state,
        data: action.payload,
        isError: false,
        isSuccess: true,
        isLoading: false,
      };
    case 'GET_MENU_USER_ERROR':
      return {
        ...state,
        data: null,
        isError: true,
        isSuccess: false,
        isLoading: false,
      };
    default:
      return state;
  }

  // if (action.type === "GET_MENU_USER_PENDING") {
  //   return {
  //     ...state,
  //     data: null,
  //     isError: false,
  //     isSuccess: false,
  //     isLoading: true,
  //   };
  // } else if (action.type === "GET_MENU_USER_SUCCESS") {
  //   return {
  //     ...state,
  //     data: action.payload,
  //     isError: false,
  //     isSuccess: true,
  //     isLoading: false,
  //   };
  // } else if (action.type === "GET_MENU_USER_ERROR") {
  //   return {
  //     ...state,
  //     data: null,
  //     isError: true,
  //     isSuccess: false,
  //     isLoading: false,
  //   };
  // } else {
  //   return state;
  // }
};

export default menuUserReducers;
