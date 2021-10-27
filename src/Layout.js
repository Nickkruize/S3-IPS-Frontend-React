import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import './App.css';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div class="maxWidth">
          <NavMenu />
          <Container fluid style = {{backgroundColor: "red"}}>
            {this.props.children}
          </Container>
        </div>
    );
  }
}
