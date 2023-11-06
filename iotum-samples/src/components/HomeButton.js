import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeButton.module.css'; // Import the CSS module

function HomeButton() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    console.log('Home Button Clicked, Go To the Home Page.');
    navigate('/');
  };

  return (
    <div>
      <button className={styles.homeButton} onClick={handleClick}>Home Page</button>
    </div>
  );
}

export default HomeButton;