import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Register from "./components/Register";
import Orders from "./components/Orders";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Admin from "./components/Admin";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/api/customers");
      setCustomers(response.data);
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Nav />
        <div className="c">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/me/:postId">
              <Orders />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
