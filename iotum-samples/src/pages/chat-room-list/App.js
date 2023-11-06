import React, { useState, useEffect, useRef } from 'react';
import CredentialsForm from '../../components/CredentialsForm';
import HomeButton from '../../components/HomeButton';
import ChatRoomList from './ChatRoomList';
import styles from './submitForm.module.css';
import * as Callbridge from '@iotum/callbridge-js';

export const App = () => {
  const [submitted, setSubmitted] = useState(false);
  const [allRooms, setAllRooms] = useState([]);
  const [credentials, setCredentials] = useState(null); // State to store credentials
  const widget = useRef(null);

  const handleSubmit = (credentials) => {
    setSubmitted(true);
    setCredentials(credentials); // Store the credentials in the state
  };

  const handleRoomButtonClick = (path) => {
    setAllRooms((prevRooms) => {
      return prevRooms.map((room) => {
        if (room.path === path) {
          return { ...room, bool: true}; // Toggle the boolean value
        }
        return room;
      });
    });
  };

  const handleRoomClose = (path) => {
    console.log(path + " was closed");
    setAllRooms((prevRooms) => {
      return prevRooms.map((room) => {
        if (room.path === path) {
          return { ...room, bool: false };
        }
        return room;
      });
    });
  };

  const renderWidget = (credentials) => {
    console.log("renderWidget ran");
    widget.current = new Callbridge.Dashboard(
      {
        domain: credentials.domain, // using the state variable for domain
        sso: {
          token: credentials.token,
          hostId: credentials.hostId
        },
        container: '#chat',
      },
      'Team',
      { layout: 'list', pathname: '/'}
    );
    console.log("dashboard rendered");

    widget.current.once('dashboard.ROOM_LIST', (data) => {
      const uniqueAccountNames = []; // To keep track of account names that should have "(you)" added
      const allRoomsChange = Object.values(data.rooms).map((room) => {
        const accounts = room.accounts.map((account) => account.name);
    
        // Check if the room has only one account
        if (accounts.length === 1) {
          const accountName = `${accounts[0]} (you)`;
          uniqueAccountNames.push(accounts[0]); // Add the account name to the unique list
          return {
            name: accountName,
            path: room.path,
            bool: false,
          };
        }
    
        // Filter out account names that are in the unique list
        const filteredNames = accounts.filter((name) => !uniqueAccountNames.includes(name));
        return {
          name: filteredNames.join(', '),
          path: room.path,
          bool: false,
        };
      });
    
      setAllRooms(allRoomsChange);
    });

    widget.current.on('dashboard.NAVIGATE', (data) => {
      if (data.pathname !== "/") {
        widget.current.load("Team", {layout: "list"})
        console.log("There was a navigate event to " + data.pathname + " in the list widget and the list widget was reloaded");
      } 

      handleRoomButtonClick(data.pathname);
      }
    )

    widget.current.on('dashboard.READY', () => {
      console.log("The list widget was rendered");
    });
  }

  useEffect(() => {
    if (submitted && credentials) {
      renderWidget(credentials);
    }
  }, [submitted, credentials]);
  
  if (submitted) {
    return (
      <div className={styles.container}>
        <div id="chat" className={styles.roomListContainer}></div>
        <div>
          <ChatRoomList rooms={allRooms} onRoomClose={handleRoomClose} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <HomeButton />
      <CredentialsForm title="Chat Room List App" onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
