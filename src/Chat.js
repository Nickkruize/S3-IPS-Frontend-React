import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import './AccessDenied.css'
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

const Chat = () => {
    const [ chat, setChat ] = useState([]);
    const [errors, setErrors] = useState([])
    const latestChat = useRef(null);

    latestChat.current = chat;

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/hubs/chat')
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(result => {
                console.log('Connected!');

                connection.on('ReceiveMessage', message => {
                    const updatedChat = [...latestChat.current];
                    updatedChat.push(message);
                
                    setChat(updatedChat);
                });
            })
            .catch(e => console.log('Connection failed: ', e));
    }, []);

    const sendMessage = async (user, message) => {
        const chatMessage = {
            user: user,
            message: message
        };

        try {
            await  fetch('https://localhost:5001/chat/messages', { 
                method: 'POST', 
                body: JSON.stringify(chatMessage),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + sessionStorage.getItem("Token")
                }
            })
            .then(response =>{
                setErrors(response)
                if (response.status === 401) {
                    alert(errors.status + " Unauthorized, must be logged in to use this service")
                }
            })
        }
        catch(e) {
            console.log('Sending message failed.', e);
            alert("Couldn't post message" + e)
        }
    }

    return (
        <div>
            <ChatInput sendMessage={sendMessage} />
            <hr />
            <ChatWindow chat={chat}/>
        </div>
    );
};

export default Chat;