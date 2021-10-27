import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

function App() {
  return (
    <Router >
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

      <Route path="/NoMatch" component={NoMatch}/>
      <Route component={NoMatch}/>

      </Switch>
      </Layout>
    </Router>
  );
}

export default App;
