import {
  AUTH_LOGOUT_SUCCESS,
  CONNECTION_OFFLINE,
  CONNECTION_ONLINE,
  SETTING_UPDATE
} from "../../actions/action-types";
import { Notifications } from "../../utils/notifications";
import {LOCAL_STORAGE_SETTINGS_STATE_KEY} from "../../constants";

export const appMiddleware = store => next => action => {
  switch (action.type) {
    case CONNECTION_ONLINE:
    case CONNECTION_OFFLINE: {
      const showNotifications = store.getState().settings.showNotifications;

      if (showNotifications) {
        Notifications.show({
          title: 'Connection state:',
          body: action.isOnline ? 'CONNECTED' : 'DISCONNECTED'
        });
      }
      break;
    }
    case SETTING_UPDATE: {
      const { setting, checked } = action;
      const localStorageState = localStorage.getItem(LOCAL_STORAGE_SETTINGS_STATE_KEY);

      const currentData = localStorageState ? JSON.parse(localStorageState) : {};

      currentData[setting] = checked;

      localStorage.setItem(LOCAL_STORAGE_SETTINGS_STATE_KEY, JSON.stringify(currentData));

      break;
    }
    case AUTH_LOGOUT_SUCCESS: {
      const registeredSubs = store.getState().chats?.registeredSubs || {};

      for (const unsub of Object.values(registeredSubs)) {
        typeof unsub === 'function' && unsub();
      }

      break;
    }
  }

  next(action);
}
