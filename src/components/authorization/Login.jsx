import React, { Component } from "react";
import { post } from "axios";
import "./index.css";

class LoginComponent extends Component {
  render() {
    return (
      <div className="container">
        <form
          onSubmit={e => {
            e.preventDefault();

            let username = e.target[0].value;
            let password = e.target[1].value;

            post("/api/authentication/", {
              username,
              password
            })
              .then(res => {
                window.localStorage.setItem("token", res.data.token);
                this.props.history.push("/chat");
              })
              .catch(res => {
                alert("Ошибка запроса");
              });
          }}
        >
          <h1>Вход</h1>
          <label htmlFor="login">
            <b>Логин</b>
          </label>
          <input
            type="text"
            name="login"
            id="login"
            placeholder="example@example.com"
          />
          <label htmlFor="password">
            <b>Пароль</b>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Пароль"
          />
          <input type="submit" className="button" value="Вход" />
        </form>
      </div>
    );
  }
}

export default LoginComponent;
