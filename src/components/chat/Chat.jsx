import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { put, get } from "axios";
import io from "socket.io-client";
import Sugar from "sugar";
import "./chat.css";

class ChatComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.messages = [];
  }

  componentDidMount() {
    get("/api/chat/last").then(res => {
      this.messages = res.data.last;
      this.forceUpdate();
    });

    var socket = io("http://localhost:8081", {
      reconnection: false,
      autoConnect: false,
      query: "token=" + window.localStorage.getItem("token")
    });
    socket.on("added_chat_message", data => {
      //   this.setState({ messages: [this.state.messages, data] });
      console.log(data);
      this.messages.push(data);
      this.forceUpdate();
    });

    socket.connect();
  }

  get isAuthenticated() {
    let token = window.localStorage.getItem("token");
    if (token) {
      var payload = JSON.parse(window.atob(token.split(".")[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className="container chat">
        <form
          onSubmit={e => {
            e.preventDefault();

            let text = e.target[0].value;
            e.target[0].value = "";

            if (text) {
              put(
                "/api/chat/message",
                { text },
                {
                  headers: {
                    authorization: window.localStorage.getItem("token")
                  }
                }
              );
            }
          }}
        >
          <div className="history">
            <div className="row">
              {this.messages.map(message => (
                <Message key={message._id} message={message} />
              ))}
            </div>
          </div>
          <div className="inputs">
            <input
              type="text"
              name="message"
              id="message"
              multiple
              disabled={!this.isAuthenticated}
              placeholder={
                !this.isAuthenticated
                  ? "Сперва войдите или зарегестрируйтесь"
                  : ""
              }
            />
            <input type="submit" value="=>" disabled={!this.isAuthenticated} />
          </div>
        </form>
      </div>
    );
  }
}

class Message extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       like: null // true or false
  //     };
  //   }
  render() {
    let { username, time, text } = this.props.message;
    return (
      <div className="message">
        <div className="first-line">
          <Link to="users/margaret" className="name">
            {username}
          </Link>
          <div className="date">
            {
              new Sugar.Date(time).format("{dd} {Mon} {yyyy} {HH}:{mm}:{ss}")
                .raw
            }
          </div>
          <div className="spacer" />
          {/* <div className="raiting">
            <i
              class="far fa-thumbs-up"
              onClick={(e => {
                console.log("like");
              })()}
            />
            <i
              class="far fa-thumbs-down"
              onClick={(e => {
                console.log("dislike");
              })()}
            />
          </div> TODO: good idea: like / dislike */}
        </div>
        <div className="text">{text}</div>
      </div>
    );
  }
}

export default ChatComponent;
