import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { AllProducts } from './AllProducts';
import { Product } from "./Product";
import { Layout } from "./Layout";
import {Home} from "./Home";
import { NoMatch } from "./NoMatch";
import { UpdateProduct } from "./UpdateProduct";

function App() {
  return (
    <Router>
      <Layout>
      <Switch>
      <Route exact path='/' component={Home} />

      <Route path="/Products" exact component={AllProducts}/>
      <Route path="/Product/:id" exact component={Product}/>
      <Route path="/Product/Create/:id" exact component={UpdateProduct}/>

      <Route path="/NoMatch" component={NoMatch}/>
      <Route component={NoMatch}/>

      </Switch>
      </Layout>
    </Router>
  );
}

export default App;
