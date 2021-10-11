import React, { Component } from "react";
import { Row, Form, Col, Container, Button } from 'reactstrap';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: ""
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
            const { email, username, password, password_confirmation } = this.state;

            axios.post(
                "https://localhost:44367/api/users/Register",
                {
                        email: email,
                        username: username,
                        password: password,
                        password_confirmation: password_confirmation
                },
                { withCredentials: false}
            )
                .then(response => {
                    try {
                        console.log("Account succesfully registered", response.data)
                        this.props.handleSuccesfulAuth(response.data)
                    }
                    catch(e){

                    }
                })
                .catch(error => {
                    this.setState({ registrationErrors: error.data });
                    console.log("registration error", this.state.registrationErrors);
                });
            event.preventDefault();
        }

        render() {
            return (
                <div>
                    <Container data-testid="RegisterContainer">
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col xs={4} />
                                <Col xs={4} style={{ textAlign: "center" }}>
                                    <label data-testid="UsernameLabel" style={{ width: "100%" }}>Username</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4} />
                                <Col xs={4} style={{ textAlign: "center" }} >
                                    <input
                                        data-testid = "UsernameInput"
                                        type="username"
                                        name="username"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                        required
                                        style={{ width: "100%" }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4} />
                                <Col xs={4} style={{ textAlign: "center" }}>
                                    <label data-testid="EmailLabel" style={{ width: "100%" }}>Email</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4} />
                                <Col xs={4} style={{ textAlign: "center" }} >
                                    <input
                                        data-testid = "EmailInput"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        required
                                        style={{ width: "100%" }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4} />
                                <Col xs={4} style={{ textAlign: "center" }}>
                                    <label data-testid="PasswordLabel" style={{ width: "100%" }}>Password</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4} />
                                <Col xs={4} style={{ textAlign: "center" }} >
                                    <input
                                        data-testid="PasswordInput"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        required
                                        style={{ width: "100%" }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4} />
                                <Col xs={4} style={{ textAlign: "center" }}>
                                    <label data-testid="PasswordConfirmLabel" style={{ width: "100%" }}>Confirm Password</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4} />
                                <Col xs={4} style={{ textAlign: "center" }} >
                                    <input
                                        data-testid="PasswordConfirmInput"
                                        type="password"
                                        name="password_confirmation"
                                        placeholder="Password confirmation"
                                        value={this.state.password_confirmation}
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
                                    <Button data-testid="RegisterButton" color="primary" size="lg" block type="submit">Register</Button>
                                </Col>
                            </Row>

                        </Form>
                    </Container>
                </div>
            );
        }
}

