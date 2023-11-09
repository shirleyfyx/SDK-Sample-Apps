import React from 'react';
import './MenuPage.css';
import ChatListButton from '../../navigation/ChatRoomListButton.js'
import TokenButton from '../../components/TokenButton.js';
import MenuButton from '../../components/MenuButton.js';

const Menu = () => {
  return (
    <div className="menu-container">
      <h1>Iotum Sample Apps</h1>
      <ChatListButton />
      <TokenButton position="left"/>
      <MenuButton />
    </div>
  );
}

export default Menu;