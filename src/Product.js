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
   
        {/* <div className="product-color">
          <span>Color</span>
   
          <div className="color-choose">
            <div>
              <input data-image="red" type="radio" id="red" name="color" value="red" checked/>
              <label for="red"><span></span></label>
            </div>
            <div>
              <input data-image="blue" type="radio" id="blue" name="color" value="blue"/>
              <label for="blue"><span></span></label>
            </div>
            <div>
              <input data-image="black" type="radio" id="black" name="color" value="black"/>
              <label for="black"><span></span></label>
            </div>
          </div>
   
        </div> */}
   
        <div className="cable-config">
          <span>Categories</span>
          {this.renderCategoryButtons()}
        </div>
      </div>

      <div className="product-price"> 
        <span>€{this.state.product.price}</span>
        <a href="/#" className="cart-btn">Add to cart</a>
      </div>
    </div>
  </div>
                {/* <Container fluid>
                <Row>
                <Col xs={4} style={{textAlign:'center'}}>
                    <img src={this.state.product.imgUrl} alt="NOT FOUND" style={{maxHeight:"40vh", maxWidth:"100%"}} />
                </Col>
                <Col style={{ textAlign: "left" }}>
                    <h2>{this.state.product.name}</h2>
                    <h2>{this.state.product.description}</h2>
                    <h2>$ {this.state.product.price}</h2>
                </Col>
                </Row>
                <Row>
                    <Col xs={4} style={{ textAlign: "center" }}>
                    {this.ifMorethanZeroCategories()}
                    {this.renderTableData()}
                    </Col>
                </Row>
                <Row>
                <Col xs={4} />
                        <Col xs={2} style={{ textAlign: "center" }}>
                            <button onClick={this.deleteProduct}>
                                Delete Product
                            </button> 
                        </Col>
                        <Col xs={2} style={{ textAlign: "center" }}>
                            <button onClick={this.toUpdate}>
                                to update
                            </button> 
                        </Col>
                </Row>
            </Container> */}
        </html>
        )
    }
}
}
