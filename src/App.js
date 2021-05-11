import { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";

import firebase from "firebase";
import db from "./firebase";
import FlipMove from "react-flip-move";

import Message from "./componets/Message";
import "./App.css";

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
      <h1>Basic Input using state.</h1>
      <form>
        <FormControl>
          <InputLabel>Enter message</InputLabel>
          <Input
            type="text"
            value={input}
            onChange={(e) => setinput(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
            disabled={!input}
          >
            Send
          </Button>
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
