import React from 'react';
import { BaseLayout } from "../components/layouts/base-layout";
import {updateSetting} from "../actions/settings";
import {useDispatch, useSelector} from "react-redux";

export const SettingsView = () => {
  const dispatch = useDispatch();

  const { isDarkTheme, showNotifications, playSound } = useSelector((state) => state.settings);

  const handleChange = ({ target: { name, checked } }) => {
    dispatch(updateSetting(name, checked));
  }

  return (
    <BaseLayout>
      <div className="centered-view">
        <div className="centered-container">
          <form className="centered-container-form">
            <div className="header">Adjust application settings</div>
            <div className="form-container">
              <div className="my-3">
                <div className="form-check">
                  <input
                    checked={isDarkTheme}
                    onChange={handleChange}
                    name="isDarkTheme"
                    type="checkbox"
                    className="form-check-input" />
                  <label className="form-check-label">Dark Theme</label>
                </div>
                <div className="form-check">
                  <input
                    checked={showNotifications}
                    onChange={handleChange}
                    name="showNotifications"
                    type="checkbox"
                    className="form-check-input" />
                  <label className="form-check-label">Enable Notification</label>
                </div>
                <div className="form-check">
                  <input
                    checked={playSound}
                    onChange={handleChange}
                    name="playSound"
                    type="checkbox"
                    className="form-check-input" />
                  <label className="form-check-label">Sound notification</label>
                </div>
              </div>
              <button
                type="button"
                onClick={() => window.electronApi.mainApi.quit()}
                className="btn btn-danger">
                Quit App
              </button>
            </div>
          </form>
        </div>
      </div>
    </BaseLayout>
  );
};
