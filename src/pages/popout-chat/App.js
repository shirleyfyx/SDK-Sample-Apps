import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './submitForm.module.css';
import TokenButton from '../../navigation/TokenButton/TokenButton';
import MenuButton from '../../navigation/MenuButton/MenuButton';
import * as Callbridge from '@iotum/callbridge-js';
import { useSelector } from 'react-redux';

const App = () => {
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const widget = useRef(null);

  const credentials = useSelector(state => state.credentials);

  // Function to render the chat widget
  const renderChatWidget = useCallback(() => {
    console.log('renderChatWidget called'); // Debugging log
    if (!widget.current || !widget.current.instance) {
      console.log("Create a new widget because the window was closed/there never was a widget");

      widget.current = new Callbridge.Dashboard({
        domain: credentials.domain,
        sso: {
          token: credentials.token,
          hostId: credentials.hostId,
        },
        container: window,
        target: {
          name: "CallbridgeChatWidget",
          checkExisting: true,
        }
      }, 'Team');

      widget.current.on('dashboard.NAVIGATE', (data) => {
        console.log("navigate event");
      });
    } else if (widget.current.instance) {
      console.log("Change focus to the existing widget that's open in a new window");
      widget.current.instance.focus();
    }
  }, [credentials]);

  // Effect for handling unread messages event
  useEffect(() => {
    console.log('Setting up invisibleWidget for unread messages'); // Debugging log

    const hiddenContainer = document.createElement('div');
      hiddenContainer.style.display = 'none';
      document.body.appendChild(hiddenContainer);
  
    const invisibleWidget = new Callbridge.Dashboard({
      domain: credentials.domain,
      sso: {
        token: credentials.token,
        hostId: credentials.hostId,
      },
      container: hiddenContainer,
      target: {
        name: "InvisibleWidget",
        checkExisting: true,
      }
    }, 'Team');

    invisibleWidget.on('dashboard.UNREAD_MESSAGES', (data) => {
      const sum = Object.values(data.rooms).reduce((m, n) => m + n, 0);
      setUnreadMessages(sum);
      setIsLoading(false);
    });

    // Cleanup function
    return () => {
      if (widget.current) {
        widget.current.unload();
        widget.current = null;
      };
      invisibleWidget.unload();
    };
  }, [credentials]);

  return (
    <>
      <TokenButton position='right' />
      <MenuButton position="right" />
      <div className={styles.chatContainer}>
        {isLoading ? (
          <div>Loading unread messages...</div>
        ) : (
          <>
            <button className={styles.biggerButton} onClick={renderChatWidget}>
              Chat
            </button>
            <span className={styles.badge}>{unreadMessages}</span>
          </>
        )}
      </div>
    </>
  );
};

export default App;
