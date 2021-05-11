import { forwardRef } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

import "./Message.css";

const Message = forwardRef(({ text, username }, ref) => {
  const isUser = username === text.username;
  return (
    <div ref={ref} className={`message ${isUser && "message_user"}`}>
      <Card className={isUser ? "message_userCard" : "message_guestCard"}>
        <CardContent>
          <Typography color="white" varient="h5" component="h2">
            {(!isUser && `${text.username}`) || "Unknown User"}: {text.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
