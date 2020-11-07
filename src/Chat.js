import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import "./Chat.css";
import db from "./firebase";
import Message from "./Message";
import ChatInput from "./ChatInput";

function Chat() {
  const { roomId } = useParams();
  const [channel, setChannelDetails] = useState(null);
  const [channelMessages, setChannelMessages] = useState([]);

  //   console.log(channel);
  //   console.log(roomId);
  console.log(channelMessages);

  useEffect(() => {
    db.collection("channels")
      .doc(roomId)
      .onSnapshot((snapshot) => setChannelDetails(snapshot.data()));

    db.collection("channels")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot(
        (snapshot) => setChannelMessages(snapshot.docs.map((doc) => doc.data()))
        // console.log(snapshot.docs)
      );
  }, [roomId]);

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong># {channel?.name} </strong>
            <StarBorderOutlinedIcon />
          </h4>
        </div>
        <div className="chat__headerRight">
          <p>
            <InfoOutlinedIcon /> Details
          </p>
        </div>
      </div>
      <div className="chat__messages">
        {channelMessages.map((message) => (
          <Message
            message={message?.text}
            timestamp={message.timestamp}
            user={message.name}
            userImage={message.userImage}
          />
        ))}
      </div>
      <ChatInput channelName={channel?.name} channelId={roomId} />
    </div>
  );
}

export default Chat;
