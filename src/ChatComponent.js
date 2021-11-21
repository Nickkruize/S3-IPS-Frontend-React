import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './inventory.css';
import Chat from './Chat';


export class ChatComponent extends Component {
    static displayName = ChatComponent.name;

    componentDidMount() {

    }

    render() {
        return<Chat/>
 }
}