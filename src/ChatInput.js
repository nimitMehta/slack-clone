import React, { useState } from "react";
import "./ChatInput.css";
import { Input, Button } from "@material-ui/core";
import { useStateValue } from "./StateProvider";
import db from "./firebase";
import firebase from "firebase";

function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState("");
  const [{ user }, dispatch] = useStateValue();

  const sendMessage = (e) => {
    e.preventDefault();
    if (channelId) {
      db.collection("channels").doc(channelId).collection("messages").add({
        text: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        name: user?.displayName,
        userImage: user?.photoURL,
      });
    }
    setInput("");
  };

  return (
    <div className="chatInput">
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter message here"
        />
        <button type="submit" onClick={sendMessage}>
          SEND
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
