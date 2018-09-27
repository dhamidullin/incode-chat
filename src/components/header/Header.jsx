import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "./header.css";

class HeaderComponent extends Component {
  get isAuthenticated() {
    let token = window.localStorage.getItem("token");
    if (token) {
      var payload = JSON.parse(window.atob(token.split(".")[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
  get username() {
    let token = window.localStorage.getItem("token");
    if (token) {
      var payload = JSON.parse(window.atob(token.split(".")[1]));

      return payload.username;
    } else {
      return null;
    }
  }
  render() {
    return (
      <header>
        <Link to="/chat" className="logo">
          Chat
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="chat">
              Чат{" "}
              {!this.isAuthenticated && (
                <span className="small-text">(read only)</span>
              )}{" "}
            </Link>
          </li>
          {this.isAuthenticated && (
            <li>
              <Link to="history">История</Link>
            </li>
          )}

          {!this.isAuthenticated && (
            <Fragment>
              <li>
                <Link to="login">Вход</Link>
              </li>
              <li>
                <Link to="register">Регистрация</Link>
              </li>
            </Fragment>
          )}

          {/* {this.isAuthenticated && (
            <li>
              <Link to="dialogs">Диалоги</Link>
            </li>
          )} */}

          {this.isAuthenticated && (
            <li>
              <span>{this.username}</span>
              <ul>
                {/* <li>
                  <Link to="settings">Настройки</Link>
                </li> */}
                <li>
                  <span
                    onClick={() => {
                      window.localStorage.removeItem("token");
                      this.props.history.push("/chat");
                    }}
                  >
                    Выход
                  </span>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </header>
    );
  }
}

export default HeaderComponent;
