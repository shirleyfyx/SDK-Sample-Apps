
//There are two widgets: One for the team chat and one for drive/contacts
//This means that the team chat widget is always running so there will be a nav event when you click a notif
//However, this app does not work on many browsers for some reason
//Also, if the team chat widget is on in the background on the room that you recieved a notif from, there will not be a nav event 

import * as Callbridge from '@iotum/callbridge-js';
import React, { useState, useRef, useEffect } from 'react';
import styles from './submitForm.module.css';


function App() {
const [token, setToken] = useState('');
const [hostId, setHostId] = useState('');
const [submitted, setSubmitted] = useState(false);
const [yourApp, setYourApp] = useState(true); 
const [unreadMessages, setUnreadMessages] = useState(); 
const [start, setStart] = useState(); 

// Create a reference for the widget container
const container = useRef(null);
// Store a reference to the current widget instance
const chatWidget  = useRef(null);
const widget = useRef(null);


const handleTokenChange = (event) => {
  setToken(event.target.value);
};


const handleHostIdChange = (event) => {
  setHostId(event.target.value);
};


const handleSubmit = () => {
  setSubmitted(true);
};

//render two widgets 
const renderWidget = () => {
  console.log("Two widgets were rendered: A chat room widget and a widget for the drive/contacts");
  console.log("Both these widgets start as invisible");

  chatWidget.current = new Callbridge.Dashboard(
    {
      domain: 'iotum.callbridge.rocks',
      sso: {
        token: token,
        hostId: hostId,
    },
      container: container.current,
    }, 
    "Team",
  );
    chatWidget.current.toggle(false);

  chatWidget.current.on('dashboard.UNREAD_MESSAGES', (data) => {
    console.log("There was an unread messages event")
    const sum = Object.values(data.rooms).reduce((m, n) => m + n, 0);
    setUnreadMessages(sum);
  });

  widget.current = new Callbridge.Dashboard(
    {
      domain: 'iotum.callbridge.rocks',
      sso: {
        token: token,
        hostId: hostId,
    },
      container: container.current,
    }, 
  );
    widget.current.toggle(false);
}

useEffect(() => {
  if(start === true) {
    chatWidget.current.on('dashboard.NAVIGATE', (data) => {
      if (data.pathname != '/') {
        loadWidget('Team');
        console.log("The chat widget navigated to this room: " + data.pathname);
      }
      else {
        console.log("The chat widget navigated to an unspecified room");
      }
  });
  }

}, [start])

useEffect(() => {
  if (submitted) {
    renderWidget();
  }
  }, [submitted]);

const loadWidget = (service) => {
  if(service === "") {
    widget.current.toggle(false);
    chatWidget.current.toggle(false);
    chatWidget.current.load("Team", {layout: "full", pathname: "/"})
    chatWidget.current.toggle(false);
    setYourApp(true);
    console.log("Load your app")
  }
  else if (service === "Team") {
    setStart(true);
    chatWidget.current.toggle(true);
    widget.current.toggle(false);  
    setYourApp(false); 
    console.log("Load the team chat widget")
  }  else {
    setStart(true); 
    widget.current.toggle(true); 
    widget.current.load(service);
    chatWidget.current.toggle(false);
    chatWidget.current.load("Team", {layout: "full", pathname: "/"})
    chatWidget.current.toggle(false);
    console.log("Load the " + service +  " widget")
    setYourApp(false); 
  }
}



  if (submitted) {
    return (
      <div className={styles.appContainer}>
        <div className={styles.verticalTabContainer}>
          <button onClick={() => loadWidget('')}>Your App</button>
          <button onClick={() => loadWidget('Team')} style={{ position: 'relative' }}>
          Team Chat
            {unreadMessages > 0 && <span className={styles.badge}>{unreadMessages}</span>}
          </button>
          <button onClick={() => loadWidget('Drive')}>Drive</button>
          <button onClick={() => loadWidget('Contacts')}>Contacts</button>
        </div>
        {yourApp && <div>Your app goes here</div>}

        <div ref={container} className={styles.widgetContainer}></div>
      </div>
    );
  }


  return (
    <div className="form-wrapper">
    <form onSubmit={handleSubmit}>
    <label>
    SSO Token:
    <input type="text" value={token} onChange={handleTokenChange} />
    </label>
    <br />
    <label>
    Host ID:
    <input type="text" value={hostId} onChange={handleHostIdChange} />
    </label>
    <br />
    <button type="submit">Submit</button>
    </form>
    </div>
  );
}


export default App;