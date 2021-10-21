import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Container} from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './inventory.css';

export class Product extends Component {
    static displayName = Product.name;

    constructor(props) {
        super(props);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.toUpdate = this.toUpdate.bind(this);
        this.id = 0;
        this.state = {
            product: JSON,
            categories: [],
            error: Error,
            isLoaded: false,
        }
    }

    componentDidMount() {

        this.id = this.props.match.params.id;

        const api = axios.create({
            baseURL: "https://localhost:44337/product"
        })

        api.get('/' + this.id)
            .then(res => {
                this.setState({ product: res.data, isLoaded: true, categories: res.data.categories })
            }).catch(error => {
                console.error(error);
                this.setState({ error: error })
                this.props.history.push("/NoMatch");
            });
    }

    toUpdate(){
        this.props.history.push("/Product/Update/" + this.id);
    }

    deleteProduct(){
        const api = axios.create({
            baseURL: "https://localhost:44337/product"
        })

        api.delete('/' + this.id)
        .then(res => {
            console.log(res);
            console.log("Product deleted");
            alert("Product deleted");
            this.props.history.push("/products");
        }).catch(error =>{
            console.error(error);
            alert("Product deleted despite error");
            this.setState({error : error});
            this.props.history.push("/products");
        })
    }

    renderTableData() {
        if (this.state.categories.length > 0) {
            return this.state.categories.map((item, index) => {
                const { id, name} = item
                return (
                    <div key={index}>
                        <div style={{textAlign:"center"}}>
                        <Link to={{ pathname: `/Category/${id}` }}>{name}</Link>
                        </div>
                    </div>
                )
            })
        }
        else {
            return null
        }
    }

    ifMorethanZeroCategories(){
        if(this.state.categories.length > 0){
            return <h2 style={{textAlign:"center"}}> Categories </h2>
        }
    }

    render() {
        if (!this.state.isLoaded) {
            return <div data-testid = "LoadingMessage">Loading..</div>
        }
        else{
            return (
                <Container fluid>
                <Row>
                    <Col xs={4} />
                    <Col xs={4} style={{ textAlign: "center" }}>
                        <img src="https://fontmeme.com/images/The-Resistance-by-MUSE.jpg" alt="NOT FOUND" />
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} />
                    <Col xs={4} style={{ textAlign: "center" }}>
                    <h2>{this.state.product.name}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} />
                    <Col xs={4} style={{ textAlign: "center" }}>
                    <h2>{this.state.product.description}</h2>
                    <h2>$ {this.state.product.price}</h2>
                    </Col>
                </Row>
                    {this.ifMorethanZeroCategories()}
                    {this.renderTableData()}
                <Row>
                <Col xs={4} />
                        <Col xs={2} style={{ textAlign: "center" }}>
                            <button onClick={this.deleteProduct}>
                                Delete Product
                            </button> 
                        </Col>
                        <Col xs={2} style={{ textAlign: "center" }}>
                            <button onClick={this.toUpdate}>
                                to update
                            </button> 
                        </Col>
                </Row>
            </Container>
        )
    }
}
}