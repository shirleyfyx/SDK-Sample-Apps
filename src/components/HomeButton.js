// HomeButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeButton.module.css'; // Import the CSS module

function HomeButton({ position = 'left' }) { // 'left' is default if no position is provided
  const navigate = useNavigate();
  
  const handleClick = () => {
    console.log('Home Button Clicked, Go To the Home Page.');
    navigate('/menu');
  };

  // Determine the button position class
  const positionClass = position === 'right' ? styles.right : styles.left;

  return (
    <div>
      <button className={`${styles.homeButton} ${positionClass}`} onClick={handleClick}>
        Home Page
      </button>
    </div>
  );
}

export default HomeButton;
