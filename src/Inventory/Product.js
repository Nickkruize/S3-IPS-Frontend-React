import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/product.css'
import { useState } from 'react';
import CartContext from '../Context/CartContext';
import { useContext } from 'react';
import Loader from '../General Components/loader';


export default function Product(props) {

    const [product, setProduct] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const {addToCart} = useContext(CartContext);


    useEffect(() => {
        const id = props.match.params.id;
        const api = axios.create({
            baseURL: "https://localhost:5001/product/" + id
        })

        api.get()
        .then(res => {
            setProduct(res.data);
            setIsLoaded(true);
        }).catch(error => {
            console.error(error);
            setError(error);
            setIsLoaded(true);
            props.history.push("/NoMatch");
        });

        return () => {};
    },[props.history, props.match.params.id]);


    function renderCategoryButtons() {
        const categories = product.categories
        if (categories.length > 0) {
            let buttons = categories.map((item, index) => {
                return (
                    <Link key={index} to={{ pathname: `/Category/${item.id}` }}><button>{item.name}</button></Link>)
            });
            return (
                <div className="cable-choose">
                    {buttons}
                </div>
            )
        }
        else {
            return null
        }
    }

    if (isLoaded === false) {
        return (
            <div data-testid="LoadingMessage"><Loader/></div>
        )
    }
    if (error != null) {
        return(
            <div>Error(s)</div>
        )
    }
    else {
        return (
            <div className="container">

                <div className="left-column">
                    <img className="active" src={product.imgUrl} alt="" />
                </div>


                <div className="right-column">
                    <div className="product-description">
                        <span>
                            <h2>{product.name}</h2>
                        </span>
                        <p style={{ color: "black" }}>{product.description}</p>
                    </div>

                    <div className="product-configuration">

                        <div className="cable-config" >
                            <h2 style={{ textAlign: 'center' }}>Categories</h2>
                                {renderCategoryButtons()}
                        </div>
                    </div>

                    <div className="product-price">
                        <span>€{product.price}</span>
                        <button className="cart-btn" onClick={() => addToCart(product)}>Add to cart</button>
                    </div>
                </div>
            </div>
        )
    }
}
