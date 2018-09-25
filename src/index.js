import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import './index.css'

/** Components */
import HeaderComponent from "./components/header/Header";

ReactDOM.render(
  <Router>
    <div>
      <Route path="*" component={HeaderComponent} />
      {/* <Route exact path="/" component={HomeComponent} /> */}
      {/* <Route exact path="/register" component={RegisterComponent} /> */}
      {/* <Route exact path="/login" component={LoginComponent} /> */}
    </div>
  </Router>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
