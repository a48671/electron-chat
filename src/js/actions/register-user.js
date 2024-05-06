import * as api from '../api/auth';
import {AUTH_REGISTER_ERROR, AUTH_REGISTER_INIT, AUTH_REGISTER_SUCCESS} from "./action-types";

export function registerUser({ email, password, username, avatar }) {
  return async function (dispatch) {
    dispatch({ type: AUTH_REGISTER_INIT });
    try {
      const user = await api.registerUser({
        email,
        password,
        username,
        avatar,
        joinedChats: []
      });

      dispatch({ type: AUTH_REGISTER_SUCCESS, user });
    } catch (error) {
      dispatch({ type: AUTH_REGISTER_ERROR, error });
      console.log(error);
    }
  }
}
