import { SET_INITIALS_SETTINGS, SETTING_UPDATE } from "./action-types";

export const updateSetting = (setting, checked) => {
  return { type: SETTING_UPDATE, setting, checked };
}

export const setInitialSettingsFromLocalStorage = () => {
  return { type: SET_INITIALS_SETTINGS };
}
