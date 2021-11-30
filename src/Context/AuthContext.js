import React, { Component } from "react";
import { decodeToken } from "react-jwt";

const AuthContext = React.createContext();

export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: null,
            isAuthenticated: false
        };

        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        if (sessionStorage.getItem("Token") != null) {
            const username = decodeToken(sessionStorage.getItem("Token")).unique_name;
            this.setState({ username: username, isAuthenticated : true })
        }
    }
    logIn(username) {
        this.setState({ username: username, isAuthenticated: true });
    }

    logOut() {
        this.setState({ username: null, isAuthenticated: false });
        sessionStorage.removeItem("Token");
    }

    render() {
        const { username, isAuthenticated } = this.state;
        const { logIn, logOut } = this;
        return (
            <AuthContext.Provider value={{
                username,
                isAuthenticated,
                logIn,
                logOut
            }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export default AuthContext