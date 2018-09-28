import React, { Component, Fragment } from "react";
import { get } from "axios";
import reactStringReplace from "react-string-replace";
import Sugar from "sugar";
import "./history.css";

class HistoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      text: "",
      dateStart: null,
      dateEnd: null,
      count: 10,
      show_range_value: false,
      newFirst: true,
      messages: []
    };
    this.lastSearchedName = "";
    this.lastSearchedText = "";
  }

  onInputChangeHandler = e => {
    let key = e.target.name;
    let value = e.target.value;

    // console.log(key + ": " + value);

    this.setState({ [key]: value });
  };

  render() {
    return (
      <Fragment>
        <div className="query-bar">
          <form
            action=""
            className="row"
            onSubmit={e => {
              e.preventDefault();

              let params = this.state;
              delete params.show_range_value;
              delete params.messages;

              this.lastSearchedName = this.state.name;
              this.lastSearchedText = this.state.text;

              get("/api/history/", {
                params,
                headers: {
                  authorization: window.localStorage.getItem("token")
                }
              }).then(res => {
                // console.log(res.data);
                this.setState({ messages: res.data.messages });
              });
            }}
          >
            <div className="input-group">
              <div className="input-group">
                <label htmlFor="name">Имя:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={this.onInputChangeHandler}
                />
              </div>
              <div className="input-group">
                <label htmlFor="text">Цитата:</label>
                <input
                  type="text"
                  id="text"
                  name="text"
                  onChange={this.onInputChangeHandler}
                />
              </div>
            </div>
            <div className="input-group">
              <div className="input-group">
                <label htmlFor="dateStart">От:</label>
                <input
                  type="datetime-local"
                  id="dateStart"
                  name="dateStart"
                  onChange={this.onInputChangeHandler}
                />
              </div>
              <div className="input-group">
                <label htmlFor="dateEnd">До:</label>
                <input
                  type="datetime-local"
                  id="dateEnd"
                  name="dateEnd"
                  onChange={this.onInputChangeHandler}
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="count">Записей на странице:</label>
              <input
                type="range"
                id="count"
                step="1"
                min="1"
                max="20"
                defaultValue="5"
                name="count"
                onChange={this.onInputChangeHandler}
                onMouseDown={e => {
                  this.setState({ show_range_value: true });
                }}
                onMouseUp={e => {
                  this.setState({ show_range_value: false });
                }}
              />
              <span
                className={`range-value ${
                  this.state.show_range_value ? "" : "hidden"
                }`}
              >
                {this.state.count}
              </span>
            </div>
            <div className="input-group">
              <label htmlFor="sort">Сортировка</label>
              <select
                id="sort"
                name="sort"
                onChange={this.onInputChangeHandler}
              >
                <option value="new">Сначала новые</option>
                <option value="old">Сначала старые</option>
                <option value="a">По username A-z</option>
                <option value="z">По username z-A</option>
              </select>
            </div>
            <div className="input-group">
              <input type="submit" value="Загрузить" />
            </div>
          </form>
        </div>
        <div className="container history">
          <table>
            <thead>
              <tr>
                <td>
                  <span />
                </td>
                <td>
                  <span>Username</span>
                </td>
                <td>
                  <span>Дата</span>
                </td>
                <td>
                  <span>Текст</span>
                </td>
              </tr>
            </thead>
            <tbody>
              {this.state.messages.map((message, index) => (
                <TablerowComponent
                  key={message._id}
                  message={message}
                  index={index}
                  searchedName={this.lastSearchedName}
                  searchedText={this.lastSearchedText}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

class TablerowComponent extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <tr key={this.props.message._id}>
        <td className="index">{this.props.index + 1}</td>
        <td className="username">
          {reactStringReplace(
            this.props.message.owner_username,
            this.props.searchedName,
            (match, i) => {
              return (
                <span key={i} className="highlight">
                  {match}
                </span>
              );
            }
          )}
        </td>
        <td className="date">
          {
            new Sugar.Date(this.props.message.date).format(
              "{dd} {Mon} {yyyy}, {HH}:{mm}:{ss}"
            ).raw
          }
        </td>
        <td className="text">
          {reactStringReplace(
            this.props.message.text,
            this.props.searchedText,
            (match, i) => {
              return (
                <span key={i} className="highlight">
                  {match}
                </span>
              );
            }
          )}
        </td>
      </tr>
    );
  }
}

export default HistoryComponent;