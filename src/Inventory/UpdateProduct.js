import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Form, Col, Container, Button } from 'reactstrap';
import axios from 'axios';
import '../css/inventory.css';

export class UpdateProduct extends Component {
    static displayName = UpdateProduct.name;

    constructor(props) {
        super(props);
        this.id = 0;
        this.state = {
            error: Error,
            name: "",
            description: "",
            price: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const { name, description, price } = this.state;

        axios.put(
            "https://localhost:5001/Product/" + this.id,
            {
                id: this.id,
                name: name,
                description: description,
                price: price
            },
            { withCredentials: false }
        )
            .then(response => {
                try {
                    console.log("Product updated", response.data);
                    alert("Product updated");
                    this.props.history.push("/Product/" + this.id);
                }
                catch (e) {
                    console.log(e);
                }
            })
            .catch(error => {
                console.log("error", error);
            });
        event.preventDefault();
    }

    componentDidMount() {

        this.id = this.props.match.params.id;

        const api = axios.create({
            baseURL: "https://localhost:5001/product"
        })

        api.get('/' + this.id)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    description: res.data.description,
                    price: res.data.price
                })
            }).catch(error => {
                console.error(error);
                this.setState({ error: error })
                this.props.history.push("/NoMatch");
            });
    }

    render() {
        return (
            <Container data-testid="CreationContainer">
                <Row>
                    <Col xs={4} />
                    <Col xs={4} style={{ textAlign: "center" }}>
                        <img src="https://fontmeme.com/images/The-Resistance-by-MUSE.jpg" alt="NOT FOUND" />
                    </Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col xs={4} />
                        <Col xs={4} style={{ textAlign: "center" }}>
                            <label data-testid="nameLabel" style={{ width: "100%" }}>name</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4} />
                        <Col xs={4} style={{ textAlign: "center" }} >
                            <input
                                data-testid="nameInput"
                                type="name"
                                name="name"
                                placeholder={this.state.name}
                                value={this.state.name}
                                onChange={this.handleChange}
                                required
                                style={{ width: "100%" }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4} />
                        <Col xs={4} style={{ textAlign: "center" }}>
                            <label data-testid="description" style={{ width: "100%" }}>Description</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4} />
                        <Col xs={4} style={{ textAlign: "center" }} >
                            <input
                                data-testid="DescriptionInput"
                                type="description"
                                name="description"
                                placeholder={this.state.description}
                                value={this.state.description}
                                onChange={this.handleChange}
                                required
                                style={{ width: "100%" }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4} />
                        <Col xs={4} style={{ textAlign: "center" }}>
                            <label data-testid="PriceLabel" style={{ width: "100%" }}>Price</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4} />
                        <Col xs={4} style={{ textAlign: "center" }} >
                            <input
                                data-testid="PriceInput"
                                type="price"
                                name="price"
                                placeholder={this.state.price}
                                value={this.state.price}
                                onChange={this.handleChange}
                                required
                                style={{ width: "100%" }}
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col xs={4} />
                        <Col xs={4} style={{ textAlign: "center" }}>
                            <Button data-testid="CreateButton" color="primary" size="lg" block type="submit">Update</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}