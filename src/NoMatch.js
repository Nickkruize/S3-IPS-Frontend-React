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
            src = "https://i1.wp.com/saedx.com/blog/wp-content/uploads/2019/01/saedx-blog-featured-70.jpg?fit=1200%2C500&ssl=1" 
            alt = ""
            style = {{width:"100%", height: "100%"}}
            />
        </Container>
    )
}
}