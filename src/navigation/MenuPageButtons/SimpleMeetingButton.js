import React from 'react';
import { useNavigate } from 'react-router-dom';

function SimpleMeetingButton() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    console.log('Simple Meeting Button Clicked.');
    navigate('/simple-meeting');
  };

  return (
    <div>
      <button className="nav-button" onClick={handleClick}>Simple Meeting App</button>
    </div>
  );
}

export default SimpleMeetingButton;
