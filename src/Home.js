import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Chat from './Chat';


export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
                <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
                <li><Link to="/Products">View All Products</Link></li>
                <li><Link to="/Categories">View All Categories</Link></li>
                <li><Link to="/ProductCreate">Add new product</Link></li>
            </ul>

            <Chat />
      </div>
    );
  }
}
