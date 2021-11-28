import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import {MyContext} from './MyContext';


export class Home extends Component {
  static displayName = Home.name;
  static contextType = MyContext

  constructor(props){
    super(props)

    this.state = {
      user : null
    }
  }


  componentDidMount(){
    this._initProfile();
  }

  _initProfile(){
  const context = this.context;

  const user = {name : "Azzania", loggedIn : true}

  context.setUser(user);
  }

  render () {
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
