import * as api from '../api/auth';
import {
  AUTH_LOGIN_INIT,
  AUTH_LOGOUT_ERROR,
  AUTH_LOGOUT_SUCCESS,
  AUTH_ON_ERROR,
  AUTH_ON_INIT,
  AUTH_ON_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_SUCCESS,
  SET_CHATS_INIT
} from "./action-types";

export function listenToAuthStateChanged() {
  return function (dispatch) {
    try {
      return api.listenToAuthStateChanged(async (user) => {
        dispatch({ type: AUTH_ON_INIT });
        if (user) {
          const userProfile = await api.getUserById(user.uid);
          dispatch({ type: AUTH_ON_SUCCESS, user: { ...userProfile, uid: user.uid } });
        } else {
          dispatch({ type: AUTH_ON_ERROR });
        }
      })
    } catch (e) {
      dispatch({ type: AUTH_ON_ERROR });
      console.error(e);
    }

  }
}

export const login = (data) => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN_INIT });
  try {
    const user = await api.login(data);
    dispatch({ type: AUTH_LOGIN_SUCCESS, user });
  } catch (error) {
    dispatch({ type: AUTH_LOGIN_ERROR, error });
  }
}

export function logout() {
  return async function (dispatch) {
    dispatch({ type: AUTH_LOGIN_INIT });
    try {
      await api.logout();

      dispatch({ type: AUTH_LOGOUT_SUCCESS });
      dispatch({ type: SET_CHATS_INIT });
    } catch (error) {
      dispatch({ type: AUTH_LOGOUT_ERROR });
      console.log(error);
    }
  }
}

export const subscribeToUserChanges = (userId) => dispatch => {
  return api.subscribeToUserChanges(userId, (profile) => {
  })
}
