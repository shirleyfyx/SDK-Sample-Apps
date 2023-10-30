import { Outlet, Link } from "react-router-dom"; 

const layout = () => {
    return (
        <>
          <nav>
            <ul>
              <li>
                <Link to="https://iotum.github.io/iotum-samples/simple-meeting/">simple-meeting</Link>
              </li>
            </ul>
          </nav>
    
          <Outlet />
        </>
      )
};

export default layout;