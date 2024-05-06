import { SET_INITIALS_SETTINGS, SETTING_UPDATE } from "../actions/action-types";
import {LOCAL_STORAGE_SETTINGS_STATE_KEY} from "../constants";

const SETTINGS_INITIAL_STATE = {
  isDarkTheme: false,
  showNotifications: true,
  playSound: true,
  saveble: true
}

export const settingsReducer = (state = SETTINGS_INITIAL_STATE, action) => {
  switch (action.type) {
    case SETTING_UPDATE:
      return { ...state, [action.setting]: action.checked };
    case SET_INITIALS_SETTINGS: {
      const settingsFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_SETTINGS_STATE_KEY);
      const settings = settingsFromLocalStorage ? JSON.parse(settingsFromLocalStorage) : {};

      return { ...state, ...settings };
    }
    default:
      return state;
  }
}
