import * as Callbridge from '@iotum/callbridge-js';
import React, { useState, useRef, useEffect } from 'react';
import styles from './submitForm.module.css';


function App() {
const [token, setToken] = useState('');
const [hostId, setHostId] = useState('');
const [submitted, setSubmitted] = useState(false);
const [showChatWidget, setShowChatWidget] = useState(false);
const [showContacts, setShowContacts] = useState(false);
const [showDrive, setShowDrive] = useState(false);


// Create a reference for the widget container
const container = useRef(null);
// Store a reference to the current widget instance
const widgetRef = useRef(null);


const handleTokenChange = (event) => {
  setToken(event.target.value);
};


const handleHostIdChange = (event) => {
  setHostId(event.target.value);
};


const handleSubmit = () => {
  setSubmitted(true);
};


const handleChatButtonClick = () => {
  setShowChatWidget(true);
  setShowDrive(false);
  setShowContacts(false);
};


const handleDriveButtonClick = () => {
  setShowChatWidget(false);
  setShowDrive(true);
  setShowContacts(false);
};


const handleContactsButtonClick = () => {
  setShowChatWidget(false);
  setShowDrive(false);
  setShowContacts(true);
};


const destroyWidget = () => {
  if (widgetRef.current) {
    widgetRef.current.unload();
    widgetRef.current = null;
  }
};


const renderWidget = () => {
  destroyWidget(); // Destroy any existing widget before creating a new one


  if (showChatWidget) {
    widgetRef.current = new Callbridge.Dashboard(
    {
    domain: 'iotum.callbridge.rocks',
    sso: {
    token: token,
    hostId: hostId,
    },
    container: container.current,
    },
    'Team',
    { layout: 'list' }
    );
  }


  else if (showDrive) {
    widgetRef.current = new Callbridge.Dashboard(
    {
    domain: 'iotum.callbridge.rocks',
    sso: {
    token: token,
    hostId: hostId,
    },
    container: container.current,
    },
    'Drive',
    { layout: 'list' }
    );
  }


  else if (showContacts) {
    widgetRef.current = new Callbridge.Dashboard(
    {
    domain: 'iotum.callbridge.rocks',
    sso: {
    token: token,
    hostId: hostId,
    },
    container: container.current,
    },
    'Contacts',
    { layout: 'list' }
    );
  }
}


useEffect(() => {
  if (submitted) {
    renderWidget();
  }
// Cleanup function to remove the widget when the component unmounts
  return () => {
    destroyWidget();
  };
  }, [submitted, showChatWidget, showMeetingWidget, activeTab]);


  if (submitted) {
    return (
      <div className={styles.appContainer}>
      <div className={styles.verticalTabContainer}>
      <button onClick={handleChatButtonClick}>Team Chat</button>
      <button onClick={handleDriveButtonClick}>Drive</button>
      <button onClick={handleContactsButtonClick}>Drive</button>
      </div>
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


