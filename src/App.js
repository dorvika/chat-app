import "./App.scss";
import React, { useEffect, useState } from "react";
import { Contacts, ChatContainer } from "./components";
import { listOfContacts, messagesList } from "./mockData";
import { getProductsFromLS, setProductsToLS } from "./helpers/localStorage";

const App = ({ userInfo, setUserInfo }) => {
  const [allMessages, setAllMessages] = useState(
    getProductsFromLS("messages") || messagesList
  );
  const [contactsList, setContactsList] = useState(
    getProductsFromLS("contacts") || listOfContacts
  );
  const [selectedChat, setSelectedChat] = useState(contactsList[0]);

  useEffect(() => {
    setProductsToLS("messages", allMessages);
  }, [allMessages]);

  useEffect(() => {
    setProductsToLS("contacts", contactsList);
  }, [contactsList]);

  return (
    <div className="container">
      <Contacts
        allMessages={allMessages}
        contactsList={contactsList}
        setSelectedChat={setSelectedChat}
        profileImg={userInfo.imageUrl}
        setUserInfo={setUserInfo}
      />
      <ChatContainer
        allMessages={allMessages}
        setAllMessages={setAllMessages}
        contactsList={contactsList}
        setContactsList={setContactsList}
        selectedChat={selectedChat}
      />
    </div>
  );
};

export default App;
