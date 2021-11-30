import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './css/navigation.css'
import { AuthConsumer } from './Context/AuthContext';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  CurrentUser() {
    return (
      <AuthConsumer>
        {props => {
          const { username, logOut } = props;
          if (username !== null) {
            return (
              <NavItem>
                <NavLink className="text-dark" to="/">{username}
                  <button button tag={Link} className="text-dark" onClick={logOut}>Logout</button>
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
        }}
      </AuthConsumer>)
  }

  render() {
    return (
      <Navbar style={{ backgroundColor: "LightBlue" }} className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand tag={Link} to="/">My Webshop</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/Products">Products</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/Categories">Categories</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                {this.CurrentUser()}
              </NavItem>
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}