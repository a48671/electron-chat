import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listenToAuthStateChanged } from "./actions/auth";
import { Pages } from "./pages";
import { listenConnectionStateChanges } from "./actions/app";
import { StoreProvider } from "./store/store-provider";
import { LoadingView } from "./components/shared/loading.view";
import { Notifications } from "./utils/notifications";
import { setInitialSettingsFromLocalStorage } from "./actions/settings";

const AppComponent = () => {
  const dispatch = useDispatch();
  const isOnline = useSelector(({ app }) => app.isOnline);
  const isDarkTheme  = useSelector(({settings}) => settings.isDarkTheme);

  useEffect(() => {
    dispatch(setInitialSettingsFromLocalStorage());

    Notifications.setup();

    const unsubscribeListenToAuthStatesChanges = dispatch(listenToAuthStateChanged());
    const unsubscribeListenOnlineStateChanges = dispatch(listenConnectionStateChanges());

    return () => {
      unsubscribeListenToAuthStatesChanges();
      unsubscribeListenOnlineStateChanges();
    }
  }, [dispatch]);

  if (!isOnline) {
    return <LoadingView message="Connection has been tutned off. Please reconnect..." />
  }

  return (
    <HashRouter>
      <div className={`content-wrapper ${isDarkTheme ? 'dark' : 'light'}`}>
        <Pages />
      </div>
    </HashRouter>
  );
};

export const App = () => <StoreProvider><AppComponent/></StoreProvider>;
