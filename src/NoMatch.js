import React, { Component } from 'react';
import './AccessDenied.css';
import {Container} from 'reactstrap';

export class NoMatch extends Component {

    constructor(props){
        super();
    }

render()
{
    return(
        <Container>
            <img 
            src = "https://cdn.mos.cms.futurecdn.net/PuXipAW3AXUzUJ4uYyxPKC-1200-80.jpg" 
            alt = ""
            style = {{width:"100%", height: "100%"}}
            />
        </Container>
    )
}
}