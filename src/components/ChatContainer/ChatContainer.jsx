import React, { useEffect, useState } from "react";
import axios from "axios";
import dateFormat from "dateformat";
import "./chatContainer.scss";

const ChatContainer = ({
  allMessages,
  setAllMessages,
  contactsList,
  setContactsList,
  selectedChat,
}) => {
  const fromMeToSelectedUser = [];
  const fromSelectedUserToMe = [];

  const [myMsgs, setMyMsgs] = useState(fromMeToSelectedUser);
  const [selectedUserMsgs, setSelectedUserMsgs] =
    useState(fromSelectedUserToMe);
  const [message, setMessage] = useState("");

  allMessages.map((msg) => {
    if (msg.senderID === selectedChat.id && msg.receiverID === 0) {
      fromSelectedUserToMe.push(msg);
    }
    if (msg.senderID === 0 && msg.receiverID === selectedChat.id) {
      fromMeToSelectedUser.push(msg);
    }
    return msg;
  });

  // create a channel between two users to show only their' messages to each other
  const messagesChannel = [
    ...fromMeToSelectedUser,
    ...fromSelectedUserToMe,
  ].sort((a, b) => a.id - b.id);

  useEffect(() => {
    // if the allMessages.length is not evenly divided by 2, it means that my message was the last one, so we can start the process of getting the reply
    if (allMessages.length % 2 !== 0) {
      setTimeout(getReply, 10000);
    }
  }, [allMessages.length]);

  const onEnterPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    const newMessage = {
      id: allMessages[allMessages.length - 1].id + 1,
      text: message,
      senderID: 0,
      receiverID: selectedChat.id,
      addedOn: Date.now(),
    };
    setMyMsgs([...myMsgs, newMessage]);
    setAllMessages([...allMessages, newMessage]);
    setMessage("");
  };

  const getReply = () => {
    axios("https://api.chucknorris.io/jokes/random").then(({ data }) => {
      const reply = {
        id: allMessages[allMessages.length - 1].id + 1,
        text: data.value,
        senderID: selectedChat.id,
        receiverID: 0,
        addedOn: Date.now(),
      };
      setSelectedUserMsgs([...selectedUserMsgs, reply]);
      setAllMessages([...allMessages, reply]);
    });
    // update contactsList with actual value of user's lastTextTime for sorting and showing user with the latest time above all others on UI
    const updatedContacts = contactsList.map((contact) => {
      if (contact.id === selectedChat.id) {
        contact.lastTextTime = Date.now();
      }
      return contact;
    });
    // set actual order of contactsList in the state
    setContactsList(
      updatedContacts.sort((a, b) => b.lastTextTime - a.lastTextTime)
    );
  };

  return (
    <section className="chat">
      <div className="profile__header">
        <div className="profile__img">
          <img
            className="user"
            src={selectedChat.profilePic}
            alt={selectedChat.name}
          />
          {selectedChat.name}
          <img
            className="check-mark chat-mark"
            src="/images/check-mark.png"
            alt="green check mark"
          />
        </div>
      </div>
      <div className="messages__container">
        {messagesChannel.map((messageData) => (
          <div
            className="message__container"
            key={messageData.addedOn}
            style={{
              justifyContent:
                messageData.senderID === 0 ? "flex-end" : "flex-start",
            }}
          >
            {messageData.senderID !== 0 && (
              <img src={selectedChat.profilePic} alt={selectedChat.name} />
            )}
            <div className="message__meta">
              <div
                className="message"
                style={{
                  background:
                    messageData.senderID === 0 ? "#d8d6d6" : "#474545",
                  color: messageData.senderID === 0 ? "black" : "white",
                }}
              >
                {messageData.text}
              </div>
              <span>
                {dateFormat(messageData.addedOn, "paddedShortDate")}
                {", "}
                {dateFormat(messageData.addedOn, "shortTime")}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="chat__box">
        <div className="chat__container">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={onEnterPress}
            type="text"
            placeholder="Type your message"
          />
          <img
            src="/images/send_message.svg"
            alt="send message icon"
            onClick={sendMessage}
          />
        </div>
      </div>
    </section>
  );
};

export default ChatContainer;
