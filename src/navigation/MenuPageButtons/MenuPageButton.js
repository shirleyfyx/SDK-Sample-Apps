import React from 'react';
import { useNavigate } from 'react-router-dom';

const MenuPageButton = ({ text, path }) => {
  const navigate = useNavigate();

  return (
    <div>
      <button className="menu-button" onClick={() => navigate(path)}>{text}</button>
    </div>
  );
}

export default MenuPageButton;
