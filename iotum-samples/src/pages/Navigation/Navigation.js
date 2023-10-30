import { Link } from "react-router-dom"; 
import './Navigation.css'

const NavigationMenu = () => {
  return (
    <div className="nav-container">
      <nav>
        <ul>
          <li ><Link to="https://iotum.github.io/iotum-samples/chat-room-list/"> <button className="nav-button">Chat Room List App</button> </Link></li>
          <li><Link to="https://iotum.github.io/iotum-samples/tabbed-dashboard/"> <button className="nav-button">Tabbed Dashboard App</button> </Link></li>
          <li><Link to="https://iotum.github.io/iotum-samples/simple-meeting/"> <button className="nav-button">Simple Meeting App</button> </Link></li>
          <li><Link to="https://iotum.github.io/iotum-samples/popout-chat-app/"> <button className="nav-button">Popout Chat App</button> </Link></li>
          <li><Link to="https://iotum.github.io/iotum-samples/list-widget-ui/"> <button className="nav-button">List Widget UI App</button> </Link></li>
        </ul>
      </nav>
    </div>
  )
};

export default NavigationMenu;