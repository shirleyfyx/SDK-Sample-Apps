import { Link } from "react-router-dom"; 
import './Navigation.css'

const NavigationMenu = () => {
  return (
    <div className="nav-container">
      <nav>
        <ul>
          <li class="nav-button" ><Link to="https://iotum.github.io/iotum-samples/chat-room-list/">ChatRoom</Link></li>
          <li class="nav-button"><Link to="https://iotum.github.io/iotum-samples/tabbed-dashboard/">TabbedDashboard</Link></li>
          <li class="nav-button"><Link to="https://iotum.github.io/iotum-samples/simple-meeting/">SimpleMeeting</Link></li>
          <li class="nav-button"><Link to="https://iotum.github.io/iotum-samples/popout-chat-app/">PopoutChat</Link></li>
          <li class="nav-button"><Link to="https://iotum.github.io/iotum-samples/list-widget-ui/">ListWidget</Link></li>
        </ul>
      </nav>
    </div>
  )
};

export default NavigationMenu;