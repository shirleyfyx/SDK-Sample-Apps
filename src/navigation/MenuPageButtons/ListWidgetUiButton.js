import React from 'react';
import { useNavigate } from 'react-router-dom';

function ListWidgetUiButton() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    console.log('List Widget UI Button Clicked.');
    navigate('/list-widget-ui');
  };

  return (
    <div>
      <button className="nav-button" onClick={handleClick}>List Widget UI App</button>
    </div>
  );
}

export default ListWidgetUiButton;
