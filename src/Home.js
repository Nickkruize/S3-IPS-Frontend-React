import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import MyContext from './MyContext';


export class Home extends Component {
  static displayName = Home.name;

  static contextType = MyContext


  render () {
    return (
      <div>
        <ul>
                <li><Link to="/Products">View All Products</Link></li>
                <li><Link to="/Categories">View All Categories</Link></li>
                <li><Link to="/ProductCreate">Add new product</Link></li>
                <li><Link to="/Chat">Chat</Link></li>
            </ul>

      {this.context.user.loggedIn && <p>{this.context.user.name}</p>}             
      </div>
    );
  }
}
