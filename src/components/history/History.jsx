import React, { Component, Fragment } from "react";
import { get } from "axios";
import "./history.css";

class HistoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        name: "",
        text: "",
        dateStart: null,
        dateEnd: null,
        count: 10
      },
      show_range_value: false
    };
  }

  onInputChangeHandler = e => {
    let key = e.target.name;
    let value = e.target.value;

    console.log(`onInputChangeHandler {${key}: ${value}}`);

    this.setState({ filters: { [key]: value } });
    // this.forceUpdate();
  };

  render() {
    return (
      <Fragment>
        <div className="query-bar">
          <form action="" className="row">
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
                <label htmlFor="dateStart">Дата начала:</label>
                <input
                  type="datetime-local"
                  id="dateStart"
                  name="dateStart"
                  onChange={this.onInputChangeHandler}
                />
              </div>
              <div className="input-group">
                <label htmlFor="dateEnd">Дата окончания:</label>
                <input
                  type="datetime-local"
                  id="dateEnd"
                  name="dateEnd"
                  onChange={this.onInputChangeHandler}
                />
              </div>
            </div>
            <div
              className="input-group"
              onMouseEnter={e => {
                this.setState({ show_range_value: true });
              }}
              onMouseLeave={e => {
                this.setState({ show_range_value: false });
              }}
            >
              <label htmlFor="count">Записей на странице:</label>
              <input
                type="range"
                id="count"
                step="5"
                min="0"
                max="100"
                defaultValue="10"
                name="count"
                onChange={this.onInputChangeHandler}
              />
              <span
                className={`range-value ${
                  this.state.show_range_value ? "" : "hidden"
                }`}
              >
                {this.state.filters.count}
              </span>
            </div>
          </form>
        </div>
        <div className="container history" />
      </Fragment>
    );
  }
}

export default HistoryComponent;
