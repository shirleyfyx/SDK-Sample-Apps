import React from 'react';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import store from './components/ReduxStore.js';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/token-page/TokenPage.js"
import Menu from "./pages/menu-page/MenuPage.js";
import ChatListApp from "./pages/chat-room-list/App.js"
import './navigation/MenuPageButtons/MenuPageButtons.css';
import './navigation/MenuPageButtons/ChatRoomListButton.js'

const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/menu",
    Component: Menu,
  },
  {
    path: "/chat-list-app",
    Component: ChatListApp,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
