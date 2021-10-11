import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';
import './inventory.css';


export class AllProducts extends Component {
    static displayName = AllProducts.name;

    constructor(props) {
        super(props);
        this.state = {
            items: null,
            isLoaded: false,
        };
    }

    componentDidMount() {
        fetch("https://localhost:44337/product")
            .then(res => res.json())
            .then(json => {
                this.setState(
                    {
                        isLoaded: true,
                        items: json,
                    })
            });
    }

    renderTableData() {
        return this.state.items.map((item) => {
            const { id, name, description, price } = item
            return (
                <tr key={id}>
                    <td><Link to={{ pathname: `/Product/${item.id}` }}>{name}</Link></td>
                    <td>{description}</td>
                    <td>{price}</td>
                </tr>
            )
        })
    }

    renderData() {
        return (
            <Container fluid>
                <Row>
                    {this.state.items.map((item) => (
                        <Col data-testid = {item.id} xs={4}>
                            <Link to={{ pathname: `/Product/${item.id}` }}><img src="https://i.pinimg.com/originals/a8/a6/cf/a8a6cf9fa132f759dab1c3c1ece5bf6e.jpg" alt="NOT FOUND" /> </Link>
                            <p>{item.name}</p>
                        </Col>
                    ))};
                </Row>
            </Container>
        )
    }


    render() {
        if (!this.state.isLoaded) {
            return <div data-testid = "LoadingMessage">Loading..</div>
        }

        if(this.state.items == null){
            return <div data-testid = "NoProductsFoundMessage">
                No products found
            </div>
        }

        else {
            return (
                <div data-testid = "AllProductsDiv">
                    {this.renderData()}
                </div>
            )
        }
    }
}