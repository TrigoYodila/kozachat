//Initial State and Actions
export const initialState = {
  user: {},
  loading: false,
};

//actions
// const actions = {
//   AUTH_START: "AUTH_START",
//   GET_USER: "GET_USER",
//   GET_TOKEN: "GET_TOKEN",
//   LOG_OUT: "LOG_OUT",
// };

//Reducer ton Handle Actions
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "AUTH_START":
      return {
        ...state,
        loading: true,
      };
    case "LOG_OUT":
      localStorage.removeItem("token");
      return initialState;
    default:
      return state;
  }
};

export default AuthReducer;
