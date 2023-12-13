import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import ChatRoomList from './ChatRoomList';
import * as Callbridge from '@iotum/callbridge-js';
import useGuardedRoute from '../../components/hooks/useGuardedRoute';

const App = () => {
  useGuardedRoute()
  const [allRooms, setAllRooms] = useState([]);
  const widget = useRef(null);

  // Retrieve credentials from Redux store
  const credentials = useSelector(state => state.credentials);

  const handleRoomButtonClick = (path) => {
    setAllRooms(prevRooms => prevRooms.map(room => {
      return room.path === path ? { ...room, bool: true } : room;
    }));
  };

  const handleRoomClose = (path) => {
    setAllRooms(prevRooms => prevRooms.map(room => {
      return room.path === path ? { ...room, bool: false } : room;
    }));
  };

  // Define the renderWidget function with useCallback
  const renderWidget = useCallback(() => {
    widget.current = new Callbridge.Dashboard(
      {
        domain: credentials.domain,
        sso: {
          token: credentials.token,
          hostId: credentials.hostId
        },
        container: '#chat',
      },
      'Team',
      { layout: 'list', pathname: '/'}
    );

    widget.current.once('dashboard.ROOM_LIST', (data) => {
      const uniqueAccountNames = [];
      const allRoomsChange = Object.values(data.rooms).map((room) => {
        const accounts = room.accounts.map((account) => account.name);
        
        if (accounts.length === 1) {
          const accountName = `${accounts[0]} (you)`;
          uniqueAccountNames.push(accounts[0]);
          return {
            name: accountName,
            path: room.path,
            bool: false,
          };
        }

        const filteredNames = accounts.filter((name) => !uniqueAccountNames.includes(name));
        return {
          name: filteredNames.join(', '),
          path: room.path,
          bool: false,
        };
      });

      setAllRooms(allRoomsChange);
    });

    widget.current.toggle(false);
  }, [credentials]); 

  useEffect(() => {
    if (credentials && credentials.token && credentials.domain && credentials.hostId) {
      const timer = setTimeout(() => {
        renderWidget();
      }, 100); // Delay the widget initialization to ensure the DOM element is available
  
      return () => {
        clearTimeout(timer);
        widget.current?.unload();
      };
    }
  }, [credentials, renderWidget]); // useEffect dependencies

  return (
    <div>
      <div id="room-buttons">
        <ChatRoomList
          rooms={allRooms}
          onRoomButtonClick={handleRoomButtonClick}
          onRoomClose={handleRoomClose}
        />
      </div>
      <div id="chat"></div>
    </div>
  );
};

export default App;
