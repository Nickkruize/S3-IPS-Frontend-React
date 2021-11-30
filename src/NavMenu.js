import React, { useContext, useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './css/navigation.css'
import { AuthConsumer } from './Context/AuthContext';
import CartContext from './Context/CartContext';

export default function NavMenu()  {
  const {cart} = useContext(CartContext);

  const [collapsed, setcollapsed] = useState(true);

  function toggleNavbar() {
    setcollapsed(!collapsed)
  }

  function CurrentUser() {
    return (
      <AuthConsumer>
        {props => {
          const { username, logOut } = props;
          if (username !== null) {
            return (
              <li>
                <NavLink tag={Link} className="text-dark" onClick={logOut} to="/">
                  {username} Logout
                </NavLink>
              </li>

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

    return (
      <Navbar style={{ backgroundColor: "LightBlue" }} className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand tag={Link} to="/">My Webshop</NavbarBrand>
          <NavbarToggler onClick={() => toggleNavbar()} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <li>
                <NavLink tag={Link} className="text-dark" to="/Products">Products</NavLink>
              </li>
              <li>
                <NavLink tag={Link} className="text-dark" to="/Categories">Categories</NavLink>
              </li>
              <li>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </li>

              <li>
                <Link to='/cart'>Cart: </Link> ({cart.length})
              </li>

              {CurrentUser()}
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    );
}