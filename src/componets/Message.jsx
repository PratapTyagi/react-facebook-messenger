import { Card, CardContent, Typography } from "@material-ui/core";

import "./Message.css";

const Message = ({ text, username }) => {
  const isUser = username === text.username;
  return (
    <div className={`message ${isUser && "message_user"}`}>
      <Card className={isUser ? "message_userCard" : "message_guestCard"}>
        <CardContent>
          <Typography color="white" varient="h5" component="h2">
            {text.username}: {text.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Message;
