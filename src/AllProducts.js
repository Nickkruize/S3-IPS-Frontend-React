import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';
import axios from 'axios';
import './inventory.css';


export class AllProducts extends Component {
    static displayName = AllProducts.name;

    constructor(props) {
        super(props);
        this.state = {
            products: null,
            isLoaded: false,
            error: null,
        };
    }

    componentDidMount() {
        const api = axios.create({
            baseURL: "https://localhost:44337/product"
        })

        api.get()
        .then(res =>{
            this.setState(
                {
                    isLoaded: true,
                    products: res.data,
                })
        })
        .catch(error =>{
            this.setState({error: error});
            this.props.history.push("/NoMatch");
        });
    }

    renderData() {
        return (
            <Container fluid>
                <Row>
                    {this.state.products.map((product, index) => (
                        <Col key={index} data-testid = {product.id} xs={4} style={{ textAlign: "center" }}>
                            <Link to={{ pathname: `/Product/${product.id}` }}><img src="https://i.pinimg.com/originals/a8/a6/cf/a8a6cf9fa132f759dab1c3c1ece5bf6e.jpg" alt="NOT FOUND" /> </Link>
                            <p>{product.name}</p>
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }


    render() {
        if (!this.state.isLoaded) {
            return <div data-testid = "LoadingMessage">Loading..</div>
        }

        if(this.state.products == null){
            return <div data-testid = "NoProductsFoundMessage">
                No products found
            </div>
        }

        else {
            return (
                <div data-testid = "AllProductsDiv">
                    {this.renderData()}
                </div>
            )
        }
    }
}