import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';


export class Home extends Component {
  static displayName = Home.name;


  render() {
    return (
      <div>
        <ul>
          <li><Link to="/Products">View All Products</Link></li>
          <li><Link to="/Categories">View All Categories</Link></li>
          <li><Link to="/ProductCreate">Add new product</Link></li>
          <li><Link to="/Chat">Chat</Link></li>
        </ul>
      </div>
    );
  }
}
