import { combineReducers, configureStore, Tuple } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { chatReducer } from "../reducers/chat-reducer";
import { authReducer } from "../reducers/auth-reducer";
import { appReducer } from "../reducers/app-reducer";
import { appMiddleware } from "./middlewares/app.middleware";
import { AUTH_LOGOUT_SUCCESS } from "../actions/action-types";
import { settingsReducer } from "../reducers/settings-reducer";

const mainReducer =  combineReducers({
  chats: chatReducer,
  auth: authReducer,
  app: appReducer,
  settings: settingsReducer
});

const rootReducer = (state, action) => {
  if (action.type === AUTH_LOGOUT_SUCCESS) {
    for (const [key, value] of Object.entries(state)) {
      if (!value.saveble) {
        state[key] = undefined;
      }
    }
  }

  return mainReducer(state, action);
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: () => new Tuple(thunk, appMiddleware)
});

