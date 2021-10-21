import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Container} from 'reactstrap';
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
            error: Error
        }
    }

    componentDidMount() {

        const id = this.props.match.params.id;

        const api = axios.create({
            baseURL: "https://localhost:44337/api/Category"
        })

        api.get('/' + id)
            .then(res => {
                this.setState({ category: res.data })
                this.setState({Products: this.state.category.products})
            }).catch(error => {
                console.error(error);
                this.setState({ error: error })
                this.props.history.push("/NoMatch");
            });
    }


    renderData() {
        return (
            <Container fluid>
                <h2 style={{ textAlign: "center" }} key={this.state.category.id}>{this.state.category.name}</h2>
                <Row>
                    {this.state.Products.map((item) => (
                        <Col xs={3} key={item.id}>
                            <Link to={{ pathname: `/Product/${item.id}` }}><img src="https://th.bing.com/th/id/OIP.c0iIyE2V0os2corDMYbKswHaHg?w=166&h=180&c=7&r=0&o=5&pid=1.7" alt="Not Found"/>  </Link>
                            <p>{item.name}</p>
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }

    render() {
        if (!this.state.category) {
            return <div/>
        }

        if(this.state.Products.length === 0)
        {
            return(
            <div>
            <h2 style={{ textAlign: "center" }} key={this.state.category.id}>{this.state.category.name}</h2>
            <Row>
                <div style={{ textAlign: "center" }}>
                    <p>This category doesn't contain any products</p>
                </div>
            </Row>
            </div>
            )
        }

        return (
            <div>
                {this.renderData()}
            </div>
        )
    }
}
