import { useState, useEffect } from "react";
import { IconButton, FormControl, Input, InputLabel } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import firebase from "firebase";
import db from "./firebase";
import FlipMove from "react-flip-move";

import Message from "./componets/Message";
import "./App.css";
import LOGO from "./ascets/logo.png";

const App = () => {
  const [input, setinput] = useState("");
  const [messages, setmessages] = useState([]);
  const [username, setusername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setmessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setusername(prompt("Enter your username"));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("messages").add({
      message: input,
      username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setinput("");
  };

  return (
    <div className="app">
      <img src={LOGO} className="app_logo" />
      <h1>Messenger</h1>
      <form className="app_form">
        <FormControl className="app_formControl">
          <Input
            className="app_input"
            placeholder="Enter a message"
            type="text"
            value={input}
            onChange={(e) => setinput(e.target.value)}
          />
          <IconButton
            className="app_iconButton"
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
            disabled={!input}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} text={message} username={username} />
        ))}
      </FlipMove>
    </div>
  );
};

export default App;
