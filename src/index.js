import React, { Suspense } from 'react';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import store from './components/ReduxStore.js';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/token-page/TokenPage.js"
import Menu from "./pages/menu-page/MenuPage.js";
import './navigation/MenuPageButtons/MenuPageButtons.css';

// Using React.lazy to dynamically import the components
const ChatRoomListApp = React.lazy(() => import("./pages/chat-room-list/App.js"));
const ListWidgetUiApp = React.lazy(() => import('./pages/list-widget-ui/App.js'));
const SimpleMeetingApp = React.lazy(() => import("./pages/simple-meeting/App.js"));
const PopoutChatApp = React.lazy(() => import("./pages/popout-chat/App.js"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, 
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  // Wrap the component with Suspense and provide a fallback
  {
    path: "/chat-room-list",
    element: (
      <Suspense fallback={<div>Loading Chat Room List...</div>}>
        <ChatRoomListApp />
      </Suspense>
    ),
  },
  {
    path: "/list-widget-ui",
    element: (
      <Suspense fallback={<div>Loading List Widget UI...</div>}>
        <ListWidgetUiApp />
      </Suspense>
    ),
  },
  {
    path: "/simple-meeting",
    element: (
      <Suspense fallback={<div>Loading Simple Meeting...</div>}>
        <SimpleMeetingApp />
      </Suspense>
    ),
  },
  {
    path: "/popout-chat",
    element: (
      <Suspense fallback={<div>Loading Popout Chat...</div>}>
        <PopoutChatApp />
      </Suspense>
    ),
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
