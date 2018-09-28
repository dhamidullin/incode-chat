import React, { Component } from "react";
import { post } from "axios";
import "./index.css";

class RegistrationComponent extends Component {
  render() {
    return (
      <div className="container registration">
        <form
          onSubmit={e => {
            e.preventDefault();

            let username = e.target[0].value;
            let password = e.target[1].value;
            let repeat = e.target[2].value;

            post("/api/authentication/register", {
              username,
              password,
              repeat
            })
              .then(res => {
                window.localStorage.setItem("token", res.data.token);
                this.props.history.push("/chat");
              })
              .catch(err => {
                alert(err.response.data.err || 'Ошибка запроса, попробуйте позже.');
              });
          }}
        >
          <h1>Регистрация</h1>
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
          <label htmlFor="repeat">
            <b>Повторите пароль</b>
          </label>
          <input
            type="password"
            name="repeat"
            id="repeat"
            placeholder="Подтвердите пароль"
          />
          <input type="submit" className="button" value="Зарегестрироваться" />
        </form>
      </div>
    );
  }
}

export default RegistrationComponent;
