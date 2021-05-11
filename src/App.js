import { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";

import Message from "./componets/Message";
import db from "./firebase";

import "./App.css";

const App = () => {
  const [input, setinput] = useState("");
  const [messages, setmessages] = useState([]);
  const [username, setusername] = useState("");

  useEffect(() => {
    const fromFirebase = async () => {
      await db.collection("messages").onSnapshot((snapshot) => {
        setmessages(snapshot.docs.map((doc) => doc.data()));
      });
    };
    fromFirebase();
  }, []);

  useEffect(() => {
    setusername(prompt("Enter your username"));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    setmessages([...messages, { input, username }]);
    setinput("");
  };

  console.log(messages);
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

      {messages.map((message) => (
        <Message key={message.id} text={message} username={username} />
      ))}
    </div>
  );
};

export default App;
