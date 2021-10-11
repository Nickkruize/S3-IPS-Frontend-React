import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Container} from 'reactstrap';
import axios from 'axios';
import './inventory.css';

export class Product extends Component {
    static displayName = Product.name;

    constructor(props) {
        super(props);
        this.state = {
            product: JSON,
            error: Error
        }
    }

    componentDidMount() {

        const id = this.props.match.params.id;

        const api = axios.create({
            baseURL: "https://localhost:44337/product"
        })

        api.get('/' + id,)
            .then(res => {
                console.log(res.data)
                this.setState({ product: res.data })
            }).catch(error => {
                console.error(error);
                console.log(error);
                this.setState({ error: error })
                this.props.history.push("/NoMatch");
            });
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
            </Container>
        )
    }
}