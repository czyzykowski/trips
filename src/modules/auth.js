import Auth from 'auth';

const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';


export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      console.log(action);
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      console.log(action);
      return {
        ...state,
        loggingIn: false,
        token: action.result
      };
    case LOGIN_FAIL:
      console.log(action);
      return {
        ...state,
        loggingIn: false,
        token: null,
        loginError: action.error
      };
    default:
      console.log(action);
      return state;
  }
}


export function login(username, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: Auth.login(username, password)
  };
}
