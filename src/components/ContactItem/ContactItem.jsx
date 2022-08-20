import "./contactItem.scss";
import { useEffect, useState } from "react";
import dateFormat from "dateformat";
// custom hook to remember previous value of msgs qty and don't show newMessageAlert if it didn't change
import { usePrevious } from "../../helpers/customHook";

const ContactItem = ({ contactData, setSelectedChat, allMessages }) => {
  const { id, name, profilePic, lastText, lastTextTime } = contactData;
  const [newMessageAlert, setNewMessageAlert] = useState(false);

  // find all messages of selected user to define array length (to define prevMsgLength for newMessageAlert) and last message info (text/date)
  const allMsgsSelectedUser = allMessages.filter((msg) => msg.senderID === id);
  const [msgsLength, setMsgsLength] = useState(allMsgsSelectedUser.length);
  const prevMsgLength = usePrevious(msgsLength);

  useEffect(() => {
    setMsgsLength(allMessages.filter((msg) => msg.senderID === id).length);
  }, [allMessages.length]);

  const lastMsg = allMsgsSelectedUser[allMsgsSelectedUser.length - 1];

  useEffect(() => {
    // prevent newMessageAlert on first render (on first render prevMsgLength value === undefined)
    if (!prevMsgLength) {
      return;
    }
    // start newMessageAlert if user messages length has grown (more than 2 because in mockData.js each user has 2 msgs at the begin)
    if (allMsgsSelectedUser.length > 2) {
      setNewMessageAlert(true);
    }
    const timer = setTimeout(() => setNewMessageAlert(false), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [allMsgsSelectedUser.length]);

  return (
    <div className="contact__item" onClick={() => setSelectedChat(contactData)}>
      <div className="contact__img">
        <img className="user" src={profilePic} alt={name} />
        <img
          className="check-mark"
          src="/images/check-mark.png"
          alt="green check mark"
        />
      </div>
      <div className="contact__info">
        <h4>{name}</h4>
        <span>
          {lastMsg.text.substring(0, 40) || lastText.substring(0, 40)}
        </span>
      </div>
      <div className="message__info">
        <span className="message__time">
          {dateFormat(lastMsg.addedOn, "mediumDate") ||
            dateFormat(lastTextTime, "mediumDate")}
        </span>
        {newMessageAlert && <div className="message__alert">+1</div>}
      </div>
    </div>
  );
};

export default ContactItem;
