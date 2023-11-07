import React from 'react';
import './HomePage.css';
import ChatListButton from '../navigation-page/ChatRoomListButton.js'

const Menu = () => {
  return (
    <div className="menu-container">
      <h1>Iotum Sample Apps</h1>
      <ChatListButton />
    </div>
  );
}

export default Menu;