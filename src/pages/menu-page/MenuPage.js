import React from 'react';
import './MenuPage.css';
import MenuPageButton from '../../navigation/MenuPageButtons/MenuPageButton.js';
import TokenButton from '../../navigation/TokenButton/TokenButton.js';
import useGuardedRoute from '../../components/hooks/useGuardedRoute.js';

const Menu = () => {
  useGuardedRoute();

  return (
    <div className="menu-container">
      <h1>Iotum Sample Apps</h1>
      <MenuPageButton text="Tabbed Dashboard" path="/iotum-samples/tabbed-dashboard" />
      <MenuPageButton text="Chat Room List" path="/iotum-samples/chat-room-list" />
      <MenuPageButton text="Simple Meeting" path="/iotum-samples/simple-meeting" />
      <MenuPageButton text="List Widget UI" path="/iotum-samples/list-widget-ui" />
      <MenuPageButton text="Popout Chat" path="/iotum-samples/popout-chat" />
      <TokenButton position="left"/>
    </div>
  );
};

export default Menu;
