import "./contacts.scss";
import React, { useState } from "react";
import ContactItem from "../ContactItem/ContactItem";

const Contacts = ({
  allMessages,
  contactsList,
  setSelectedChat,
  profileImg,
  setUserInfo,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [foundUser, setFoundUser] = useState([]);

  const searchUser = (e) => {
    setSearchQuery(e.target.value);
    // check search query that passed user
    // if it's more that 0 (user passed some query) - start search and create filtered array
    if (e.target.value.length > 0) {
      const filteredUser = contactsList.filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFoundUser(filteredUser);
      // if it's length equals 0, it means that user deleted searchQuery, so reset array of found user
    } else {
      setFoundUser([]);
    }
  };

  return (
    <section className="contacts">
      <div className="profile">
        <img
          className="user"
          src={profileImg || "/images/profile/default_avatar.png"}
          alt="avatar"
        />
        <img
          className="check-mark"
          src="/images/check-mark.png"
          alt="green check mark"
        />
        <button onClick={() => setUserInfo({})}>Logout</button>
      </div>
      <div className="search__box">
        <div className="search__container">
          <img src="/images/search-icon.svg" alt="search_icon" />
          <input
            value={searchQuery}
            onChange={searchUser}
            type="text"
            placeholder="Search or start new chat"
          />
        </div>
      </div>
      <h2 className="title">Chats</h2>
      {/* There is no found user but there is search query, so user doesn't exist */}
      {!foundUser.length && searchQuery ? (
        <div className="info">Sorry, there is no user with this name :(</div>
      ) : // We found needed user, so show only found user and don't show list of all contacts
      foundUser.length > 0 ? (
        foundUser.map((contactData) => (
          <ContactItem
            key={contactData.id}
            contactData={contactData}
            setSelectedChat={setSelectedChat}
            allMessages={allMessages}
          />
        ))
      ) : (
        // In other case show list of all contacts
        contactsList.map((contactData) => (
          <ContactItem
            key={contactData.id}
            contactData={contactData}
            setSelectedChat={setSelectedChat}
            allMessages={allMessages}
          />
        ))
      )}
    </section>
  );
};

export default Contacts;
