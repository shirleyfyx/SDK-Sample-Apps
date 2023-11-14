import React, { useRef, useEffect } from 'react';
import * as Callbridge from '@iotum/callbridge-js';
import styles from './chat.module.css';

const ChatRoom = (props) => {
  const chatContainerRef = useRef(null); 

  useEffect(() => {
    // This code will run after the component has rendered and the chat container is available in the DOM
    const chatRoom = new Callbridge.Dashboard(
      {
        domain: 'iotum.callbridge.rocks',
        container: chatContainerRef.current, // Use the DOM element reference
      },
      'Team',
      { layout: 'main', pathname: props.path }
    );

    console.log("A new chat room was opened: " + props.path);

    // Cleanup function to be called when the component unmounts
    return () => {
      chatRoom.unload(); // Replace with actual cleanup method if available
      console.log("Chat room was closed: " + props.path);
    };
  }, [props.path]); 

  // Render the chat container reference
  return <div ref={chatContainerRef} className={styles.chatRoom}></div>;
};

export default ChatRoom;
