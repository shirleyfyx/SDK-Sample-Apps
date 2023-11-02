import React from 'react';
import { useNavigate } from 'react-router-dom';

function ChatListButton() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    console.log('Chat Room List Button clicked.');
    navigate('/chat-list-app');
  };

  return (
    <div>
      <button className="nav-button" onClick={handleClick}>Chat Room List App</button>
    </div>
  );
}

export default ChatListButton;
