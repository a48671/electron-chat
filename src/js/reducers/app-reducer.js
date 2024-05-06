import { combineReducers } from 'redux';
import { CONNECTION_OFFLINE, CONNECTION_ONLINE } from "../actions/action-types";

function createAppReducer() {
  const isOnline = (state = window.navigator.onLine, action) => {
    switch(action.type) {
      case CONNECTION_ONLINE:
      case CONNECTION_OFFLINE:
        return action.isOnline;
      default:
        return state;
    }
  }

  return combineReducers({
    isOnline
  });
}

export const appReducer = createAppReducer();
