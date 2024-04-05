import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/">
              <News pagesize={5} category={"general"} />
            </Route>
            <Route path="/business">
              <News pagesize={5} category={"business"} />
            </Route>
            <Route path="/entertainment">
              <News pagesize={5} category={"entertainment"} />
            </Route>
            <Route path="/health">
              <News pagesize={5} category={"health"} />
            </Route>
            <Route path="/science">
              <News pagesize={5} category={"science"} />
            </Route>
            <Route path="/sports">
              <News pagesize={5} category={"sports"} />
            </Route>
            <Route path="/technology">
              <News pagesize={5} category={"technology"} />
            </Route>
          </Routes>
        </Router>
      </div>
    );
  }
}
