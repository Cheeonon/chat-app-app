import './ChatRoomPage.scss';

import io from "socket.io-client";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMessageList } from '../../utils/axios';

const ChatRoomPage = () => {

  const {state} = useLocation();
  const navigate = useNavigate();
  const { roomID, roomUserName, userID, roomUserID, profileURL } =  state;

  const [messageList, setMessageList] = useState([]);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [btnClass, setBtnClass] = useState("chat-room__btn");

  // button style
  useEffect(()=>{
    if(isValid){
      setBtnClass("chat-room__btn chat-room__btn--valid")
    } else{
      setBtnClass("chat-room__btn")
    }
  }, [isValid])

  // function for keeping the scroll bar at the bottom
  const scrollToBottom = () => {
    const lastMessage = document.querySelector(".chat-room__msg-list").lastElementChild;

    console.log(lastMessage)
    if(lastMessage){
      lastMessage.scrollIntoView();
    }
  }

  // get the message list everytime a new message is sent
  useEffect(()=>{
    getMessageList({roomID: roomID})
    .then(resolve => {
      setMessageList(resolve.data.messageList);
    })
    .catch(error => {
      console.log(error);
    })
  }, [isNewMessage])

  // keep the scroll bar the the bottom
  useEffect(()=>{
    scrollToBottom(); 
  }, [messageList])

  // connect to the server
  const socket = io("http://localhost:3030", {
    cors: { origin: "*" },
    transports: ["websocket"],
  });

  socket.on("connect", () => {
      console.log("Connected to the server.");
      socket.emit('join', roomID);
  });

  socket.on("createMessage", (message)=>{
    const newMessageList = [...messageList];
    newMessageList.push(message);
    setMessageList(newMessageList)

  })

  // send message
  const handleSubmit = (event) => {
    event.preventDefault();
    const message = event.target.message.value;

    if(isValid){
      socket.emit( "newMessage",{
          content: message,
          from: userID,
          to: roomUserID,
          roomID: roomID
      });
      event.target.reset();
      setIsValid(false);
      setIsNewMessage(!isNewMessage);
    }
  };


// check if the input field is empty or not
const handleChange = (event) => {
  const message = event.target.value;

  if(message){
    setIsValid(true);
  } else{
    setIsValid(false);
  }
}

  return (
    <div className='chat-room'>
      <div className="chat-room__header">
        <img src={profileURL} alt="user profile" className="chat-room__header-profile" />
        <span className="chat-room__header-name">{ roomUserName }</span>
        <span className="chat-room__header-back" onClick={() => navigate(-1)}>↩</span>
      </div>
      <div className="chat-room__body">
        <ul className="chat-room__msg-list">

          {messageList.map((message, index) => {

            if(message.from === userID){
              return(
                <li className="chat-room__msg-item chat-room__msg-item--me">
                  <span className="chat-room__message chat-room__message--me">{message.content}</span>
                  <span className="chat-room__date chat-room__date--me">{message.createdAt}</span>
                </li> 
              )
            } else{
              return(
                <li className="chat-room__msg-item" key={index}>
                  <img src={profileURL} alt="user profile" className="chat-room__profile" />
                  <div className="chat-room__msg-container">
                    <span className="chat-room__name">{ roomUserName }</span>
                    <span className="chat-room__message">{message.content}</span>
                  </div>
                  <span className="chat-room__date">{message.createdAt}</span>
                </li>
              )
            }
            
          })}
        </ul>
        
        <form action="" className="chat-room__form" onSubmit={(event)=>{handleSubmit(event)}} onChange={(event)=>{handleChange(event)}} >
          <input type="text" className="chat-room__msg" name="message"/>
          <button className={btnClass}>Send</button>
        </form>
      </div>
    </div>
  )
}

export default ChatRoomPage