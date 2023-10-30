import { Link } from "react-router-dom"; 

const NavigationMenu = () => {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="https://iotum.github.io/iotum-samples/chat-room-list/">ChatRoom</Link></li>
          <li><Link to="https://iotum.github.io/iotum-samples/tabbed-dashboard/">TabbedDashboard</Link></li>
          <li><Link to="https://iotum.github.io/iotum-samples/simple-meeting/">SimpleMeeting</Link></li>
          <li><Link to="https://iotum.github.io/iotum-samples/popout-chat-app/">PopoutChat</Link></li>
          <li><Link to="https://iotum.github.io/iotum-samples/list-widget-ui/">ListWidget</Link></li>
        </ul>
      </nav>
    </>
  )
};

export default NavigationMenu;