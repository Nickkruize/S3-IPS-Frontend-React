import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Container} from 'reactstrap';
import axios from 'axios';
import './inventory.css';

export class UpdateProduct extends Component {
    static displayName = UpdateProduct.name;

    constructor(props) {
        super(props);
        this.updateProduct = this.updateProduct.bind(this);
        this.id = 0;
        this.state = {
            product: JSON,
            error: Error
        }
    }

    componentDidMount() {

        this.id = this.props.match.params.id;

        const api = axios.create({
            baseURL: "https://localhost:44337/product"
        })

        api.get('/' + this.id)
            .then(res => {
                console.log(res.data)
                this.setState({ product: res.data })
            }).catch(error => {
                console.error(error);
                this.setState({ error: error })
                this.props.history.push("/NoMatch");
            });
    }

    updateProduct(){
        const api = axios.create({
            baseURL: "https://localhost:44337/product"
        })

        this.state.product.name = "Updated in react";

        console.log(this.state.product.name);

        api.put('/' + this.id,
        {
            id : this.state.product.id,
            name : this.state.product.name,
            description : this.state.product.description,
            price : this.state.product.price
        },
        { withCredentials: false}
        )
        .then(res => {
            this.props.history.push("/Product/" + this.id);
        }).catch(error =>{
            console.error(error);
        })
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col xs={4}>
                        <img src="https://fontmeme.com/images/The-Resistance-by-MUSE.jpg" alt="NOT FOUND" />
                    </Col>
                </Row>
                <Row>
                <Col>
                        <h2>{this.state.product.name} {this.state.product.description} for {this.state.product.price}</h2>
                </Col>
                </Row>
                <Row>
                    <Col xs={4}>
                    <button onClick={this.updateProduct}>
                        Update Product
                        </button> 
                        </Col>
                </Row>
            </Container>
        )
    }
}