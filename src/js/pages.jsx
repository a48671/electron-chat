import React from 'react';
import { Route, Routes } from "react-router-dom";
import { HomeView } from "./views/home.view";
import { ChatView } from "./views/chat.view";
import { SettingsView } from "./views/settings.view";
import { WelcomeView } from "./views/welcome.view";
import { useSelector } from "react-redux";
import { CreateChatView } from "./views/create-chat.view";

export const Pages = () => {
  const user = useSelector(({ auth }) => auth.user);

  return (
    <Routes>
      {!!user && <>
        <Route path="/home" element={<HomeView />} />
        <Route path="/chat/:id" element={<ChatView />} />
        <Route path="/create-chat" element={<CreateChatView />} />
        <Route path="/settings" element={<SettingsView />} />
      </>}
      <Route path="*" element={<WelcomeView />} />
    </Routes>
  );
};
