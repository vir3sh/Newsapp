import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <News key="sports" pagesize={6} category={"sports"} />
            </Route>
            <Route exact path="/business">
              <News key="business" pagesize={6} category={"business"} />
            </Route>
            <Route exact path="/entertainment">
              <News
                key="entertainment"
                pagesize={6}
                category={"entertainment"}
              />
            </Route>
            <Route exact path="/health">
              <News key="health" pagesize={6} category={"health"} />
            </Route>
            <Route exact path="/general">
              <News key="general" pagesize={6} category={"general"} />
            </Route>
            <Route exact path="/science">
              <News key="science" pagesize={6} category={"science"} />
            </Route>
            <Route exact path="/sports">
              <News key="sports" pagesize={6} category={"sports"} />
            </Route>
            <Route exact path="/technology">
              <News key="technology" pagesize={6} category={"technology"} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
