import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { Row, Col, Spinner} from 'reactstrap';
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
            baseURL: "https://192.168.178.115:5001/api/Category"
        })

        try{
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
                if(error.response.status === 404){
                    this.props.history.push("/NoMatch");
                }
            }
            else{
                this.setState({error: error, isLoaded: true})
            }})
        }
        catch(e){
            this.setState({error: e, isLoaded: true})
            console.log(e);
        }
    }

    componentWillUnmount(){
        console.log("Bye");
    }

    renderData() {
        return (
                <Row>
                    {this.state.categories.map((category, index) => (
                        <Col key={index} data-testid = {category.id} xs={3} style={{ textAlign: "center" }}>
                            <Link data-testid = {`link${category.id}`} to={{ pathname: `/Category/${category.id}` }}><img style={{width : "100%"}} src="https://img.static-rmg.be/a/view/q75/w1092/h615/2136101/emma-watson-jpg.jpg" alt="Not Found"/></Link>
                            <p>{category.name}</p>
                        </Col>
                    ))}
                </Row>
        )
    }


    render() {
        if (!this.state.isLoaded) {
            return <div data-testid = "LoadingMessage" style={{textAlign:"center", marginTop:"25%"}}>
                <Spinner animation="border" children={false} style={{color:"green", width:'5rem', height:"5rem"}}/>
                </div>
        }

        if (this.state.error != null) {
            return <div style={{marginTop:"25%"}}>
                <h2>{this.state.error.message}</h2>
                </div>
        }

        if(this.state.categories == null){
            return <div data-testid = "NoCategoriesFoundMessage" style={{marginTop:"25%"}}>
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