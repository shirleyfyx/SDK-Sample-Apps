import React from 'react';
import './MenuPage.css';
import MenuPageButton from '../../navigation/MenuPageButtons/MenuPageButton.js';
import TokenButton from '../../navigation/TokenButton/TokenButton.js';

const Menu = () => {
  return (
    <div className="menu-container">
      <h1>Iotum Sample Apps</h1>
      <MenuPageButton text="Chat Room List App" path="/chat-room-list" />
      <MenuPageButton text="List Widget UI App" path="/list-widget-ui" />
      <MenuPageButton text="Simple Meeting App" path="/simple-meeting" />
      <MenuPageButton text="Popout Chat App" path="/popout-chat" />
      <TokenButton position="left"/>
    </div>
  );
}

export default Menu;