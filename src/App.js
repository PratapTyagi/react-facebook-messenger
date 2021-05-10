import { useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";

import Message from "./componets/Message";

import "./App.css";

const App = () => {
  const [input, setinput] = useState("");
  const [messages, setmessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    setmessages([...messages, input]);
    setinput("");
  };

  return (
    <>
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

      <div>
        {messages.map((message) => (
          <Message key={message.id} text={message} />
        ))}
      </div>
    </>
  );
};

export default App;
