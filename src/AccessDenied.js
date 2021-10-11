import React, { Component } from 'react';
import './AccessDenied.css';
import {Container} from 'reactstrap';

export class AccessDenied extends Component {

    constructor(props){
        super();
    }

render()
{
    return(
        <Container>
            <img 
            src = "https://ih1.redbubble.net/image.1046954141.7254/st,small,845x845-pad,1000x1000,f8f8f8.jpg" 
            alt = ""
            style = {{width:"100%", height: "100%"}}
            />
        </Container>
    )
}
}