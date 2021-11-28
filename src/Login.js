import React, { Component } from "react";
import { Row, Form, Col, Button } from 'reactstrap';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import { MyContext } from "./MyContext";
import {decodeToken} from 'react-jwt';


export class Login extends Component {
    static contextType = MyContext

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
        this.toRegister = this.toRegister.bind(this);

    }


    componentDidMount(){
        const context = this.context;
        if(context.user != null){
            alert("Already logged in")
            this.props.history.push("/")
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const { email, password } = this.state;
        const context = this.context;
 
        try{
            axios
            .post(
                "https://localhost:5001/api/AuthManagement/Login",
                {
                        email: email,
                        password: password
                },
                { withCredentials: false }
            )
            .then(response => {
                console.log(response.data);
                if (response.data.succes) {
                    alert("Logged in succesfully");
                    sessionStorage.setItem("Token", response.data.token);
                    this.props.history.push("/");
                    context.setUser(this.DecodeToken(response.data.token))                  
                }
                })
            .catch(error => {
                console.log(error.response.data.errors)
                this.setState({ loginErrors: error.response.data.errors});
            });
        event.preventDefault();
        this.clearPasswordError();
    }
    catch(e){
        console.log(e);
    }
}

    DecodeToken(token){
        const myDecodedToken = decodeToken(token);
        const username = myDecodedToken.unique_name;
        return username;
    }

    CheckForErrors() {
        if (this.state.loginErrors != null) {
            return (
                <div>
                    {this.state.loginErrors.map((error, index) =>(
                    <h2 key={index} style={{ color: 'red', textAlign:"center"}}>{error}</h2>
                    ))}
                </div>
            )}}

    clearPasswordError(){
            this.setState({
                password:"",
                loginErrors: null
            })
    }

    toRegister(){
        this.props.history.push("/Register");
    }

    getUserName(){
        if (this.context.user != null) {
            const user = this.context.user;
            console.log(user)
            return(
                <p>{user}</p>
            )
        }
    }

    render() {
        return (
            <div>
                {this.getUserName()}
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
                        <Col xs={2} style={{ textAlign: "center" }}>
                            <Button data-testid = "LoginButton" id = "LoginButton" color="primary" size="lg" block type="submit">Login</Button>
                        </Col>
                        <Col xs={2} style={{ textAlign: "center" }}>
                            <Button data-testid = "RegisterButton" id = "RegisterButton" color="primary" size="lg" onClick={this.toRegister}>Register</Button>
                        </Col>
                    </Row>
                    </Form>
                    </div>
        );
    }
}