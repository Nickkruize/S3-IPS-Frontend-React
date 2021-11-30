import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from 'react';

import { Layout } from "./Layout";
import { NoMatch } from "./NoMatch";
import { Home } from "./Home";

import { AllProducts } from './Inventory/AllProducts';
import { AllCategories } from "./Inventory/AllCategories";
import { Category } from "./Inventory/Category";
import { Product } from "./Inventory/Product";
import { UpdateProduct } from "./Inventory/UpdateProduct";
import { CreateProduct } from "./Inventory/CreateProduct";

import { Register } from "./Register";
import { Login } from "./Login";

import {ChatComponent} from './Chat/ChatComponent';

import { AuthProvider } from "./Context/AuthContext";

import './css/App.css'


export default class App extends React.Component {

  render() {
    return (
      <AuthProvider>
        <Router>
          <Layout>
            <Switch>

              <Route exact path='/' component={Home} />

              <Route path="/Products" exact component={AllProducts} />
              <Route path="/Product/:id" exact component={Product} />
              <Route path="/ProductCreate" exact component={CreateProduct} />
              <Route path="/Product/Update/:id" exact component={UpdateProduct} />
              <Route path="/Category/:id" exact component={Category} />
              <Route path="/Categories" exact component={AllCategories} />
              <Route path="/Register" exact component={Register} />
              <Route path="/Login" exact component={Login} />
              <Route path="/Chat" exact component={ChatComponent} />

              <Route path="/NoMatch" component={NoMatch} />
              <Route component={NoMatch} />
            </Switch>
          </Layout>
        </Router>
      </AuthProvider>
    );
  }
}
