import React from 'react';
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Menu from "./pages/home-page/HomePage.js";
import NavigationMenu from "./pages/navigation-page/NavigationPage.js";
import ChatListApp from "./pages/chat-room-list/App.js"

const router = createBrowserRouter([
  {
    path: "/",
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
