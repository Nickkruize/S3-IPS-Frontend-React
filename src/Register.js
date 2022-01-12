import React, { Component } from "react";
import { Row, Form, Col, Button } from 'reactstrap';
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
            registrationErrors: null
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
        const { email, username, password } = this.state;

        axios.post(
            "https://localhost:5001/api/AuthManagement/Register",
            {
                email: email,
                username: username,
                password: password
            },
            { withCredentials: false }
        )
            .then(response => {
                alert("Account succesfully registered", response.data)
                this.props.history.push("/");
            })
            .catch(error => {
                this.setState({ registrationErrors: error });
            });
        event.preventDefault();
    }

    CheckForErrors() {
        if (this.state.registrationErrors != null) {
            const errors = this.state.registrationErrors.response.data.errors;
            return (
                <div>
                    {errors.map((error, index) => (
                        <p key={index} style={{ color: 'red', textAlign: "center" }}>{error}</p>
                    ))}
                </div>
            )
        }
    }

    render() {
        return (
            <div style={{ marginTop: "15%" }}>
                <Row xs={1}>
                    {this.CheckForErrors()}
                </Row>
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
                                data-testid="UsernameInput"
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
                                data-testid="EmailInput"
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
            </div>
        );
    }
}

