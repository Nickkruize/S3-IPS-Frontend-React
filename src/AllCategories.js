import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import './inventory.css';


export class AllCategories extends Component {
    static displayName = AllCategories.name;

    constructor(props) {
        super(props);
        this.state = {
            categories: null,
            isLoaded: false,
            error: null,
        };
    }

    componentDidMount() {
        const api = axios.create({
            baseURL: "https://localhost:5001/api/Category"
        })

        api.get()
        .then(res =>{
            this.setState(
                {
                    isLoaded: true,
                    categories: res.data,
                })
        })
        .catch(error =>{
            if(error.response){
                this.setState({response: error.response});
                console.log(error.response)
                if(error.response.status === 404){
                    this.props.history.push("/NoMatch");
                }
            }
            else{
                this.setState({error: error})
                console.log(error);
            }})
    }

    componentWillUnmount(){
        console.log("Bye");
    }

    renderData() {
        return (
                <Row>
                    {this.state.categories.map((category, index) => (
                        <Col key={index} data-testid = {category.id} xs={3} style={{ textAlign: "center" }}>
                            <Link data-testid = {`link${category.id}`} to={{ pathname: `/Category/${category.id}` }}><img style={{width : "100%"}} src="https://img.bekiamoda.com/galeria/3000/3619_m.jpg" alt="Not Found"/></Link>
                            <p>{category.name}</p>
                        </Col>
                    ))}
                </Row>
        )
    }


    render() {
        if (!this.state.isLoaded) {
            return <div data-testid = "LoadingMessage">Loading..</div>
        }

        if(this.state.categories == null){
            return <div data-testid = "NoCategoriesFoundMessage">
                No products found
            </div>
        }

        else {
            return (
                <div data-testid = "AllCategoriesDiv" className="overview-container">
                    {this.renderData()}
                </div>
            )
        }
    }
}