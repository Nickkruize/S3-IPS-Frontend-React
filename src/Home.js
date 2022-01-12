import React from 'react';
import { Link } from 'react-router-dom';
import './css/index.css'


export default function Home() {

    return (
      <div id="homepagediv">
        <ul>
          <li id="productlink"><Link to="/Products">View All Products</Link></li>
          <li id="categorylink"><Link to="/Categories">View All Categories</Link></li>
          <li id="productcreatelink"><Link to="/ProductCreate">Add New Product</Link></li>
          <li id="chatlink"><Link to="/Chat">Chat</Link></li>

          <li id="about-page-link"><Link to="/About">About Us</Link></li>
        </ul>

        <div style={{ textAlign: "center" }}>
          <img src="https://s.s-bol.com/nl/upload/images/ps/banners/campagne/2022/Sale-solden-jan/31512-Sale_solden-hoofdmiddelen-fase2-NL_mhp-header.jpg"/>
        </div>
      </div>
    );
  }
