import React from 'react';
import {Navbar} from "../navbar";

export const BaseLayout = ({ children, ... props }) => {
  return (
    <>
      <Navbar { ...props } />
      {children}
    </>
  );
};
