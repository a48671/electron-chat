import React from 'react';
import { store } from "./index";
import { Provider } from "react-redux";

export const StoreProvider = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
