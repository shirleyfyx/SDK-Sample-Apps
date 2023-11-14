import React from 'react';
import { useNavigate } from 'react-router-dom';

function ChatRoomListButton() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    console.log('Chat Room List Button Clicked.');
    navigate('/chat-room-list');
  };

  return (
    <div>
      <button className="nav-button" onClick={handleClick}>Chat Room List App</button>
    </div>
  );
}

export default ChatRoomListButton;
