import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Container} from 'reactstrap';
import './inventory.css';
import { Link } from 'react-router-dom';
import axios from "axios";


export class AllPublishers extends Component {
    static displayName = AllPublishers.name;

    constructor(props) {
        super(props);
        this.state = {
            publishers: null,
            isLoaded: false,
            error: null,
        }
    }

    componentDidMount() {
        let api = axios.create({
            baseURL: "https://localhost:44367/api/Publishers"
        })

            api.get()
            .then(res => {
                this.setState({publishers : res.data, isLoaded : true});
            })
            .catch(err =>{
                this.setState({error : err});
            })
        }
    

    sendGeTRequest = async() =>{
        let api = axios.create({
            baseURL: "https://localhost:44367/api/Publishers"
        })
        try
        {
            const resp = await api.get();
            this.setState({publishers : resp.data, isLoaded : true});
        }
        catch (err){
            this.setState({error : err});
        }
    };

    renderTableData() {
        return this.state.publishers.map((item) => {
            const { id, name, foundingYear } = item
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{foundingYear}</td>
                </tr>
            )
        })
    }


    renderData() {
        return (
            <Container fluid>
                <Row style={{ textAlign: "center" }}>
                    {this.state.publishers.map((item) => (
                        <Col key={item.id} data-testid = {item.id} style={{ textAlign: "center" }} xs={3}>
                            <Link to={{ pathname: `/Publisher/${item.id}` }}><img src={item.logo} alt="NOT FOUND" /> </Link>
                            <p>{item.name}, {item.foundingYear}</p>
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
        
        if(this.state.publishers == null){
            return <div data-testid = "NoPublishersFoundMessage">
                No publishers found
            </div>
        }

        else {
            return (

                <div data-testid = "AllPublishersDiv">
                    {this.renderData()}
                </div>

            )
        }
    }
}

            //return (
            //    <div>
            //        <h1 id='title'>All Albums</h1>
            //        <Table stripid bordered hover>
            //            <thead>
            //                <tr>
            //                    <td>id</td>
            //                    <td>artistID</td>
            //                    <td>title</td>
            //                    <td>released in</td>
            //                </tr>
            //            </thead>
            //            <tbody>
            //                {this.renderTableData()}
            //            </tbody>
            //        </Table>
            //    </div>
            //)