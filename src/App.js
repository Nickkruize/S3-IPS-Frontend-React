import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from 'react'
import './App.css';
import { AllProducts } from './AllProducts';
import { Product } from "./Product";
import { Layout } from "./Layout";
import {Home} from "./Home";
import { NoMatch } from "./NoMatch";
import { UpdateProduct } from "./UpdateProduct";
import { CreateProduct } from "./CreateProduct";
import { Register } from "./Register";
import {Category} from "./Category";
import {AllCategories} from "./AllCategories";
import {Login} from "./Login";
import {ChatComponent} from "./ChatComponent"
import {TestBearer} from "./TestBearer";
import { MyContext } from "./MyContext";


export default class App extends React.Component{

  setUser = (user) => {
    this.setState({user});
  }

  state = {
    user : null,
    setUser : this.setUser,
  }

  render(){
  return (
    <MyContext.Provider value={this.state}>
    <Router>
      <Layout>
      <Switch>

      <Route exact path='/' component={Home} />

      <Route path="/Products" exact component={AllProducts}/>
      <Route path="/Product/:id" exact component={Product}/>
      <Route path="/ProductCreate" exact component={CreateProduct}/>
      <Route path="/Product/Update/:id" exact component={UpdateProduct}/>
      <Route path="/Category/:id" exact component={Category}/>
      <Route path="/Categories" exact component={AllCategories}/>
      <Route path="/Register" exact component={Register}/>
      <Route path="/Login" exact component={Login}/>
      <Route path="/Chat" exact component={ChatComponent}/>
      <Route path="/Test" exact component={TestBearer}/>

      <Route path="/NoMatch" component={NoMatch}/>
      <Route component={NoMatch}/>
      </Switch>
      </Layout>
    </Router>
    </MyContext.Provider>
  );
}
}
