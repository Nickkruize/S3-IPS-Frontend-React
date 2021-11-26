import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import './index.css'

export class Layout extends Component {
  static displayName = Layout.name;

  componentWillMount() {
    document.body.style.backgroundColor = "#181818";
  }

  render () {
    return (
      <>
        <main>
        <NavMenu />
        {this.props.children}
        </main>
        <footer>
          privacy blabla
        </footer>
        </>
    );
  }
}
