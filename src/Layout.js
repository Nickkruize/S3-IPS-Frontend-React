import React, { useEffect } from 'react';
import  NavMenu from './NavMenu';
import './css/index.css'

export default function Layout(props){

  useEffect(() => {
    document.body.style.backgroundColor = "white";
    return () => {}
  }, [])

    return (
      <>
        <header>
          <NavMenu />
        </header>
        <main>
          {props.children}
        </main>
        <footer>
          privacy blabla
        </footer>
      </>
    );
  }
