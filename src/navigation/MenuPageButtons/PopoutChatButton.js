import React from 'react';
import { useNavigate } from 'react-router-dom';

function PopoutChatButton() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    console.log('Popout Chat Button Clicked.');
    navigate('/popout-chat');
  };

  return (
    <div>
      <button className="nav-button" onClick={handleClick}>Popout Chat App</button>
    </div>
  );
}

export default PopoutChatButton;
