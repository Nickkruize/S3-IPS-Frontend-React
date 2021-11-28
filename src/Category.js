import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col} from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './inventory.css';

export class Category extends Component {
    static displayName = Category.name;

    constructor(props) {
        super(props);
        this.state = {
            category: JSON,
            Products: [],
            isLoaded: false,
            error: Error
        }
    }

    componentDidMount() {

        const id = this.props.match.params.id;

        const api = axios.create({
            baseURL: "https://localhost:5001/api/Category"
        })

        api.get('/' + id)
            .then(res => {
                this.setState({ category: res.data, isLoaded: true })
                this.setState({Products: this.state.category.products})
            }).catch(error => {
                console.error(error);
                this.setState({ error: error })
                this.props.history.push("/NoMatch");
            });
    }

    componentWillUnmount(){
        console.log("Bye");
    }


    renderData() {
        return (
                <Row>
                    {this.state.Products.map((item, index) => (
                        <Col id="Productinfo" xs={3} key={index}>
                            <Link id="producturl" to={{ pathname: `/Product/${item.id}` }}><img id="productImg" src={item.imgUrl} alt="Not Found"/>  </Link>
                            <p id="productname">{item.name}</p>
                        </Col>
                    ))}
                </Row>
        )
    }

    render() {

        if (!this.state.isLoaded) {
            return <div data-testid = "LoadingMessage">Loading..</div>
        }

        if(this.state.Products.length === 0)
        {
            return(
            <div style={{ textAlign: "center", marginTop:"20%"}}>
            <h2 key={this.state.category.id}>{this.state.category.name}</h2>
                <h2>There are no products for this categorie</h2>
            </div>
            )
        }

        return (
            <div id="category-products-container" className="overview-container">
                <h2 id="categoryTitle" key={this.state.category.id} style={{marginBottom:"25px", marginTop:"25px"}}>{this.state.category.name}</h2>
                {this.renderData()}
            </div>
        )
    }
}
