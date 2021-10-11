import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Container} from 'reactstrap';
import axios from 'axios';
import './inventory.css';

export class Product extends Component {
    static displayName = Product.name;

    constructor(props) {
        super(props);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.toUpdate = this.toUpdate.bind(this);
        this.id = 0;
        this.state = {
            product: JSON,
            error: Error,
            isLoaded: false,
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
            baseURL: "https://localhost:44337/product"
        })

        api.delete('/' + this.id)
        .then(res => {
            console.log(res);
            console.log("Product deleted");
            this.props.history.push("/products");
        }).catch(error =>{
            console.error(error);
            this.setState({error : error});
            this.props.history.push("/NoMatch");
        })
    }

    render() {
        if (!this.state.isLoaded) {
            return <div data-testid = "LoadingMessage">Loading..</div>
        }
        else{
            return (
                <Container fluid>
                <Row>
                    <Col xs={4} />
                    <Col xs={4} style={{ textAlign: "center" }}>
                        <img src="https://fontmeme.com/images/The-Resistance-by-MUSE.jpg" alt="NOT FOUND" />
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} />
                    <Col xs={4} style={{ textAlign: "center" }}>
                    <h2>{this.state.product.name}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} />
                    <Col xs={4} style={{ textAlign: "center" }}>
                    <h2>{this.state.product.description}</h2>
                    <h2>$ {this.state.product.price}</h2>
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
            </Container>
        )
    }
}
}