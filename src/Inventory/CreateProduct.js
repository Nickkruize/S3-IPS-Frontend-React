import React, { Component } from "react";
import { Row, Form, Col, Button } from 'reactstrap';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/inventory.css';

export class CreateProduct extends Component {
    static displayName = CreateProduct.name;

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            price: "",
        };

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

        axios.post(
            "https://localhost:5001/Product",
            {
                name: name,
                description: description,
                price: price
            },
            { withCredentials: false }
        )
            .then(response => {
                try {
                    console.log("Product created", response.data)
                    alert("Product created");
                    this.props.history.push("/Product/" + response.data.id);
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

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col xs={4} />
                    <Col xs={4} className="centered">
                        <label data-testid="nameLabel">name</label>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} />
                    <Col xs={4} className="centered" >
                        <input
                            data-testid="nameInput"
                            type="name"
                            name="name"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            required
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} />
                    <Col xs={4} className="centered">
                        <label data-testid="description">Description</label>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} />
                    <Col xs={4} className="centered" >
                        <input
                            data-testid="DescriptionInput"
                            type="description"
                            name="description"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={this.handleChange}
                            required
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} />
                    <Col xs={4} className="centered">
                        <label data-testid="PriceLabel">Price</label>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} />
                    <Col xs={4} className="centered" >
                        <input
                            data-testid="PriceInput"
                            type="price"
                            name="price"
                            placeholder="Price"
                            value={this.state.price}
                            onChange={this.handleChange}
                            required
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs={4} />
                    <Col xs={4} className="centered">
                        <Button data-testid="CreateButton" color="primary" size="lg" block type="submit">Create</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

