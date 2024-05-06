import { combineReducers } from 'redux';
import {
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_INIT,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_ERROR,
  AUTH_LOGOUT_INIT,
  AUTH_LOGOUT_SUCCESS,
  AUTH_ON_ERROR,
  AUTH_ON_INIT,
  AUTH_ON_SUCCESS,
  AUTH_REGISTER_ERROR,
  AUTH_REGISTER_INIT,
  AUTH_REGISTER_SUCCESS
} from "../actions/action-types";

function creatLoginReducer() {
  const error = (state = null, action) => {
    switch (action.type) {
      case AUTH_LOGIN_INIT:
        return null;
      case AUTH_LOGIN_ERROR:
        return action.error;
      default:
        return state;
    }
  }

  return combineReducers({
    error
  });
}

function creatRegisterReducer() {
  const error = (state = null, action) => {
    switch (action.type) {
      case AUTH_REGISTER_INIT:
        return null ;
      case AUTH_REGISTER_ERROR: {
        return action.error;
      }
      default:
        return state;
    }
  }
  return combineReducers({
    error
  });
}

export const isChecking = (state = false, action) => {
  switch(action.type) {
    case AUTH_REGISTER_INIT:
    case AUTH_LOGIN_INIT:
    case AUTH_ON_INIT:
    case AUTH_LOGOUT_INIT:
      return true;
    case AUTH_REGISTER_SUCCESS:
    case AUTH_REGISTER_ERROR:
    case AUTH_LOGIN_SUCCESS:
    case AUTH_LOGIN_ERROR:
    case AUTH_ON_SUCCESS:
    case AUTH_LOGOUT_SUCCESS:
    case AUTH_LOGOUT_ERROR:
    case AUTH_ON_ERROR:
      return false ;
    default:
      return state;
  }
}

const user = (state = null, action) => {
  switch(action.type) {
    case AUTH_ON_SUCCESS:
    case AUTH_LOGIN_SUCCESS:
    case AUTH_REGISTER_SUCCESS:
      return action.user;
    case AUTH_ON_ERROR:
    case AUTH_LOGOUT_INIT:
    case AUTH_LOGOUT_SUCCESS:
      return null;
    default:
      return state;
  }
}

export const authReducer = combineReducers({
  isChecking,
  user,
  login: creatLoginReducer(),
  register: creatRegisterReducer()
});
