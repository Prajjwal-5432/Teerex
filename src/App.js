import "./App.css";
import { Route, Switch } from "react-router-dom";
import Checkout from "./components/Checkout/Checkout";
import Products from "./components/Products/Products";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/">
          <Products />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
