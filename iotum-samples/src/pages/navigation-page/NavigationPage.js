import { Link } from "react-router-dom"; 
import './NavigationPage.css'

const NavigationMenu = () => {
  return (
    <div className="nav-container">
      <nav>
        <ul>
          <li ><Link to="/chat-list-app"> <button className="nav-button">Chat Room List App</button> </Link></li>
        </ul>
      </nav>
    </div>
  )
};

export default NavigationMenu;