import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Map from "./components/Map";
import Login from "./components/Login";
import Favorites from "./components/Favorites";

const App = () => {
  return (
    <Router>
      <section>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/map" component={Map} />
          <Route path="/login" exact component={Login} />
          <Route path="/favorites" exact component={Favorites} />
        </Switch>
      </section>
    </Router>
  );
};

export default App;
