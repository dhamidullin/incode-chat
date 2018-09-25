import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";

class HeaderComponent extends Component {
  render() {
    return (
      <header>
        <Link to="/" className="logo">
          Chat
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="register">Вход</Link>
          </li>
          <li>
            <Link to="login">Регистрация</Link>
          </li>

          <li>
            <Link to="chat">Чат</Link>
          </li>
          <li>
            <Link to="dialogs">Диалоги</Link>
          </li>

          <li>
            <span>Профиль</span>
            <ul>
              <li>
                <Link to="settings">Настройки</Link>
              </li>
              <li>
                <span>Выход</span>
              </li>
            </ul>
          </li>
        </ul>
      </header>
    );
  }
}

export default HeaderComponent;
