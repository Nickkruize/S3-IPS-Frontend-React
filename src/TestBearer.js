import React, { Component } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';


export class TestBearer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : null,
            isLoaded : false,
            error: null
        };


    }

    componentDidMount(){
        axios
            .get(
                "https://localhost:5001/api/Login/",
                {
                    headers:{
                        Authorization: 'Bearer '
                    }
                }
            )
            .then(response => {
                console.log(response);
                this.setState({data : response.data, isLoaded : true});
                console.log(this.state.data)
                })
            .catch(error => {
                this.setState({isLoaded : true, error: error.response });
                console.log(error.response);
            });
    }

mapdata(){
    return(
        <div>
            {this.state.data.map((data, index) => (
                <div key={index}>{data}</div>
            ))}
        </div>
    )
}

    render() {
        if (!this.state.isLoaded){
                return(
                <div>Loading</div>
            )}
        if (this.state.error != null && this.state.error.status === 401){
            return(
                <div>{this.state.error.status} Unauthorized</div>              
            )
        }
        else{
                return(
                this.mapdata()
                )
            }
        }
}