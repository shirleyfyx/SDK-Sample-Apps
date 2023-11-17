import React from 'react';
import './MenuPage.css';
import ChatRoomListButton from '../../navigation/MenuPageButtons/ChatRoomListButton.js';
import ListWidgetUiButton from '../../navigation/MenuPageButtons/ListWidgetUiButton.js';
import SimpleMeetingButton from '../../navigation/MenuPageButtons/SimpleMeetingButton.js';
import PopoutChatButton from '../../navigation/MenuPageButtons/PopoutChatButton.js';
import TokenButton from '../../navigation/TokenButton/TokenButton.js';

const Menu = () => {
  return (
    <div className="menu-container">
      <h1>Iotum Sample Apps</h1>
      <ChatRoomListButton />
      <ListWidgetUiButton />
      <SimpleMeetingButton />
      <PopoutChatButton />
      <TokenButton position="left"/>
    </div>
  );
}

export default Menu;