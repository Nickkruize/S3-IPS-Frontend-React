import React, { Component } from "react";
import { Row, Form, Col, Container, Button } from 'reactstrap';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

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
                "https://localhost:44337/Product",
                {
                        name: name,
                        description: description,
                        price: price
                },
                { withCredentials: false}
            )
                .then(response => {
                    try {
                        console.log("Product created", response.data)
                        alert("Product created");
                        this.props.history.push("/Product/" + response.data.id);
                    }
                    catch(e){
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
                <div>
                    <Container data-testid="CreationContainer">
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
                                        data-testid = "nameInput"
                                        type="name"
                                        name="name"
                                        placeholder="Name"
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
                                        data-testid = "DescriptionInput"
                                        type="description"
                                        name="description"
                                        placeholder="Description"
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
                                        placeholder="Price"
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
                                    <Button data-testid="CreateButton" color="primary" size="lg" block type="submit">Create</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </div>
            );
        }
}

