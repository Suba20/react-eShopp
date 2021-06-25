import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  //useParams,
} from "react-router-dom";
import Nav from "./Component/Nav";
import ProductList from "./Component/ProductList";
import Cart from "./Component/Cart";
import Description from "./Component/Description";
import Payment from "./Component/Payment";
import Checkout from "./Component/Checkout";
import Confirmation from "./Component/Confirmation";
//import Login from "./Component/Login";
//import Signup from "./Component/Signup";
import { useState } from "react";

function App() {
  const [searchPattern, changeSearchPattern] = useState("");
  const [sortType, changeSortType] = useState("none");

  const filterProducts = (e) => {
    changeSearchPattern(e.target.value);
  };
  const sortProducts = (sortType) => {
    changeSortType(sortType);
  };

  return (
    <Router>
      <Nav filterProducts={filterProducts} sortProducts={sortProducts} />
      <Switch>
        <Route path="/" exact>
          <ProductList searchPattern={searchPattern} sortType={sortType} />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
        {/*<Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>*/}
        <Route path="/buy" exact>
          <Checkout />
        </Route>
        <Route path="/payment" exact>
          <Payment />
        </Route>
        <Route path="/confirm" exact>
          <Confirmation />
        </Route>

        <Route path="/:id" exact>
          <Description />
        </Route>
        <p className="ui center aligned">
          <h1>
            Wrong route <Link to="/login">Go Home</Link>
          </h1>
        </p>
      </Switch>
    </Router>
  );
}

export default App;
