import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import '../css/inventory.css';
import Loader from '../General Components/loader';


export class AllProducts extends Component {
    static displayName = AllProducts.name;

    constructor(props) {
        super(props);
        this.state = {
            products: null,
            isLoaded: false,
            error: null,
            response: null
        };
    }

    componentDidMount() {
        const api = axios.create({
            baseURL: "https://localhost:5001/product"
        })

        api.get()
            .then(res => {
                console.log(res.data)
                this.setState(
                    {
                        isLoaded: true,
                        products: res.data,
                    })
            })
            .catch(error => {
                if (error.response) {
                    this.setState({ response: error.response, isLoaded : true });
                    if (error.response.status === 404) {
                        this.props.history.push("/NoMatch");
                    }
                }
                else {
                    this.setState({ error: error, isLoaded : true })
                }
            });
    }


    componentWillUnmount() {
        console.log("Bye");
    }

    renderData() {
        return (
            <Row>
                {this.state.products.map((product, index) => (
                    <Col key={index} data-testid={product.id} xs={3} style={{ textAlign: "center" }}>
                        <Link to={{ pathname: `/Product/${product.id}` }}><img style={{ width: "100%" }} src={product.imgUrl} alt="Not Found" /> </Link>
                        <Row>
                        <Col>{product.name}</Col>
                        <Col>€{product.price}</Col>
                        </Row>
                    </Col>
                ))}
            </Row>
        );
    }

    render() {

        if (this.state.error != null) {
            return (
                <div style={{ marginTop: "25%" }}>
                    <h2>{this.state.error.message}</h2>
                </div>
            )
        }
        if (!this.state.isLoaded) {
            return <Loader />
        }

        if (this.state.products == null) {
            return <div data-testid="NoProductsFoundMessage">
                No products found
            </div>
        }

        else {
            return (
                <div data-testid="AllProductsDiv" className="overview-container">
                    {this.renderData()}
                </div>
            )
        }
    }
}