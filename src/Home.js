import React from 'react';
import { Link } from 'react-router-dom';
import './css/index.css'


export default function Home() {

    return (
      <div>
        <ul>
          <li id="productlink"><Link to="/Products">View All Products</Link></li>
          <li id="categorylink"><Link to="/Categories">View All Categories</Link></li>
          <li id="productcreatelink"><Link to="/ProductCreate">Add New Product</Link></li>
          <li id="chatlink"><Link to="/Chat">Chat</Link></li>

          <Link id="about-page-link" to="/About">About Us</Link>
        </ul>
      </div>
    );
  }
