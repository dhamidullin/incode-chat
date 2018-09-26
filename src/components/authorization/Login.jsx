import React, { Component } from "react";
import { post } from "axios";
import "./index.css";

class LoginComponent extends Component {
  render() {
    return (
      <div className="container login">
        <form
          onSubmit={e => {
            e.preventDefault();

            let username = e.target[0].value;
            let password = e.target[1].value;

            post("/api/authentication/login", {
              username,
              password
            })
              .then(res => {
                window.localStorage.setItem("token", res.data.token);
                this.props.history.push("/chat");
              })
              .catch(err => {
                if (!err.response) {
                  alert("Сервер недоступен");
                } else {
                  alert(err.response.data.err);
                }
              });
          }}
        >
          <h1>Вход</h1>
          <label htmlFor="username">
            <b>Имя пользователя</b>
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Steeve, Dave, Margaret, etc..."
          />
          <label htmlFor="password">
            <b>Пароль</b>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          <input type="submit" className="button" value="Вход" />
        </form>
      </div>
    );
  }
}

export default LoginComponent;
