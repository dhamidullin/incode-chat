import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./index.css";

/** Components */
import HeaderComponent from "./components/header/Header";
import RegistrationComponent from "./components/authorization/Registration";
import LoginComponent from "./components/authorization/Login";
import ChatComponent from "./components/chat/Chat";

ReactDOM.render(
  <Router>
    <div>
      <Route path="*" component={HeaderComponent} />
      <Route exact path="/chat" component={ChatComponent} />
      <Route exact path="/register" component={RegistrationComponent} />
      <Route exact path="/login" component={LoginComponent} />
    </div>
  </Router>,
  document.getElementById("root")
);

// if (module.hot) {
//   module.hot.accept();
// }
