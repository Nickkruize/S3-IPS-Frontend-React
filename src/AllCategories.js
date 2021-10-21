import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';
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
            baseURL: "https://localhost:44337/api/Category"
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
            console.log(error);
            this.setState({error: error});
            this.props.history.push("/NoMatch");
        });
    }

    renderData() {
        return (
            <Container fluid>
                <Row>
                    <Col xs={3}/>
                    {this.state.categories.map((category) => (
                        <Col data-testid = {category.id} xs={2} style={{ textAlign: "center" }}>
                            <Link to={{ pathname: `/Category/${category.id}` }}>{category.name}</Link>
                        </Col>
                    ))}
                </Row>
            </Container>
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
                <div data-testid = "AllCategoriesDiv">
                    {this.renderData()}
                </div>
            )
        }
    }
}