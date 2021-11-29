import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/product.css'

export class Product extends Component {
    static displayName = Product.name;

    constructor(props) {
        super(props);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.toUpdate = this.toUpdate.bind(this);
        this.id = 0;
        this.state = {
            product: null,
            categories: [],
            error: Error,
            isLoaded: false,
        }
    }

    componentDidMount() {

        this.id = this.props.match.params.id;

        const api = axios.create({
            baseURL: "https://localhost:5001/product"
        })

        api.get('/' + this.id)
            .then(res => {
                this.setState({ product: res.data, isLoaded: true })
            }).catch(error => {
                console.error(error);
                this.setState({ error: error })
                this.props.history.push("/NoMatch");
            });
    }
    
    componentWillUnmount(){
        console.log("Bye");
    }
    
    toUpdate(){
        this.props.history.push("/Product/Update/" + this.id);
    }

    deleteProduct(){
        const api = axios.create({
            baseURL: "https://localhost:5001/product"
        })

        api.delete('/' + this.id)
        .then(res => {
            console.log(res);
            console.log("Product deleted");
            alert("Product deleted");
            this.props.history.push("/products");
        }).catch(error =>{
            console.error(error);
            alert("Product deleted despite error");
            this.setState({error : error});
            this.props.history.push("/products");
        })
    }

    renderCategoryButtons() {
        let categories = this.state.product.categories;
        if (categories.length > 0) {
            let buttons = categories.map((item, index) => {
                return(
                <Link to={{ pathname: `/Category/${item.id}` }}><button key={index}>{item.name}</button></Link>)});
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

    notYetImplemented(){
        return alert("not yet implemented")
    }

    ifMorethanZeroCategories(){
        if(this.state.categories.length > 0){
            return <h2 style={{textAlign:"center"}}> Categories </h2>
        }
    }

    render() {
        if (!this.state.isLoaded) {
            return <div data-testid = "LoadingMessage">Loading..</div>
        }
        else{
            return (
            <html>
            <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet"></link>
            </head>

<div className="container">

    <div className="left-column">     
      <img className="active" src={this.state.product.imgUrl} alt=""/>
    </div>
   
   
    <div className="right-column">
      <div className="product-description">
        <span>
            <h2>{this.state.product.name}</h2>
            </span>
        <p style={{color:"white"}}>{this.state.product.description}</p>
      </div>
   
      <div className="product-configuration">
   
        <div className="cable-config">
          <span>Categories</span>
          {this.renderCategoryButtons()}
        </div>
      </div>

      <div className="product-price"> 
        <span>€{this.state.product.price}</span>
        <button className="cart-btn" onClick={this.notYetImplemented}>Add to cart</button>
      </div>
    </div>
  </div>
        </html>
        )
    }
}
}
