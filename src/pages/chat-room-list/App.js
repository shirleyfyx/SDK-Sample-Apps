import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import ChatRoomList from './ChatRoomList';
import styles from './submitForm.module.css';
import * as Callbridge from '@iotum/callbridge-js';

export const App = () => {
  const [allRooms, setAllRooms] = useState([]);
  const widget = useRef(null);
  
  // Retrive credentials from Redux store
  const credentials = useSelector(state => state.credentials);
  console.log("Credentials:", credentials);

  const handleRoomButtonClick = (path) => {
    setAllRooms(prevRooms => prevRooms.map(room => {
      return room.path === path ? { ...room, bool: true } : room;
    }));
  };

  const handleRoomClose = (path) => {
    console.log(path + " was closed");
    setAllRooms(prevRooms => prevRooms.map(room => {
      return room.path === path ? { ...room, bool: false } : room;
    }));
  };

  const renderWidget = useCallback(() => {
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
  }, [credentials]);

  useEffect(() => {
    if (credentials && credentials.token && credentials.url && credentials.hostId) {
      renderWidget(credentials);
    }

    return () => {
      widget.current?.unload();
    }
  }, [credentials, renderWidget]);
 
  return (
    <div className={styles.container}>
      <div id="chat" className={styles.roomListContainer}></div>
      <div>
        <ChatRoomList rooms={allRooms} onRoomClose={handleRoomClose} />
      </div>
    </div>
  );
  
};

export default App;
