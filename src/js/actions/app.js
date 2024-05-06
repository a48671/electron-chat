import { CONNECTION_OFFLINE, CONNECTION_ONLINE } from "./action-types";

const makeHandleConnectionStateChanges = dispatch => () => {
  const isOnline = window.navigator.onLine;

  dispatch({ type: isOnline ? CONNECTION_ONLINE : CONNECTION_OFFLINE, isOnline });
}

export const listenConnectionStateChanges = () => dispatch => {
  const handleConnectionStateChanges = makeHandleConnectionStateChanges(dispatch);

  window.addEventListener('online', handleConnectionStateChanges);
  window.addEventListener('offline', handleConnectionStateChanges);

  return () => {
    window.removeEventListener('online', handleConnectionStateChanges);
    window.removeEventListener('offline', handleConnectionStateChanges);
  }
}
