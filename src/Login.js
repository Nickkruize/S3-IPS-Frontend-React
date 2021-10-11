import React, { Component } from "react";
import { Row, Form, Col, Container, Button } from 'reactstrap';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';


export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            loginErrors: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearPasswordError = this.clearPasswordError.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const { email, password } = this.state;
        var session = new Session();

        axios
            .post(
                "https://localhost:44382/api/users/Login",
                {
                        email: email,
                        password: password
                },
                { withCredentials: false }
            )
            .then(response => {
                console.log(response);
                if (response.status === 'Invalid') {
                    alert('Invalid Login Attempt');
                }
                else {
                    session.set("User", response.data)
                    this.props.history.push("/");
                }
                })
            .catch(error => {
                this.setState({ loginErrors: error.response.data });
                console.log(this.state.loginErrors);
            });
        event.preventDefault();
        this.clearPasswordError();
    }

    CheckForErrors() {
        if (this.state.loginErrors != null) {
            return (
                <div>
                    <h2 style={{ color: 'red', textAlign:"center"}}>{this.state.loginErrors}</h2>
                </div>
            )
        }
    }

    clearPasswordError(){
            this.setState({
                password:"",
                loginErrors: null
            })
    }

    // clearloginError(){
    //     this.setState({
    //         loginErrors: null
    //     })
    // }

    render() {
        return (
            <Container data-testid="LoginContainer">
                <Row xs={1}>
                    {this.CheckForErrors()}
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col xs={4} />
                        <Col xs={4} style={{ textAlign: "center" }}>
                            <div ></div>
                            <label data-testid="EmailLabel" id="EmailLabel" style={{ width: "100%" }}>Email</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4}/>
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
                            <label data-testid="PasswordLabel" id="PasswordLabel" style={{ width: "100%" }}>Password</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4} />
                        <Col xs={4} style={{ textAlign: "center"}} >
                            <input
                            data-testid="PasswordInput"
                                id = "PasswordInput"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                required
                                style={{ width: "100%"}}
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col xs={4} />
                        <Col xs={4} style={{ textAlign: "center" }}>
                            <Button data-testid = "LoginButton" id = "LoginButton" color="primary" size="lg" block type="submit">Login</Button>
                        </Col>
                    </Row>
                    </Form>
            </Container>
        );
    }
}

class Session extends Map {
    set(id, value) {
        if (typeof value === 'object') value = JSON.stringify(value);
        sessionStorage.setItem(id, value);
    }

    get(id) {
        const value = sessionStorage.getItem(id);
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }
}