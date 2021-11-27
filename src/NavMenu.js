import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './css/navigation.css'
import { MyContext } from './MyContext';

export class NavMenu extends Component {
  static displayName = NavMenu.name;
  static contextType = MyContext

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
        collapsed: true,
        User : null
      };

      this.Logout = this.Logout.bind(this);
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
    }

    Logout() {
        if (sessionStorage.getItem("User") != null) {
            sessionStorage.removeItem("User");
            this.setState({ User: null });
        }
    }

    componentDidMount() {
        var session = new Session();
        if (session.get("User") != null) {
            console.log(this.state.User);
            this.setState({ User: session.get("User") });
        }
    }

    CurrentUser() {
        if (this.state.User != null) {
            return (
                <NavItem>
                    <NavLink className="text-dark" to="/">{this.state.User.username}
                        <button button tag={Link} className="text-dark" onClick={this.Logout}>Logout</button>
                    </NavLink>
                </NavItem>
                )
        }
        else {
            return (
                <NavItem >
                    <NavLink tag={Link} className="text-dark" to="/Login">Login</NavLink>
                </NavItem>
                )
        }

    }

  render () {
    return (
        <Navbar style={{backgroundColor:"LightBlue"}} className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">My Webshop</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
              <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/Categories">Categories</NavLink>
                </NavItem> 
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>           
                {this.CurrentUser()}
              </ul>
            </Collapse>
          </Container>
        </Navbar>
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