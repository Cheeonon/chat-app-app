import './RoomListPage.scss';
import {NavLink, useLocation} from 'react-router-dom';
import Header from '../../components/Header/Header';
import { getRoomList } from '../../utils/axios';
import { useEffect, useState } from 'react';
import chatIcon from '../../assets/icons/message.svg';

const RoomListPage = () => {

  const {state} = useLocation();
  const user = state.user;
  const [roomList, setRoomList] = useState(null);
  const baseProfileURL = "http://localhost:3030/img/";

  useEffect(()=>{
    getRoomList({userID: user.id})
    .then(resolve => {
      setRoomList(resolve.data.chatList);
    })
    .catch(err => {
      console.log(err);
    })
  }, [user.id])

  if(!roomList){
    return <h1>Loading....</h1>
  }

  return (
    <div className='room'>
    <Header user={user}/>
    <div className="room__content">
      <div className="room__title-container">
        <h2 className='room__title'>Chats</h2>
        <div className="room__add">
          <img className="room__add-img" src={chatIcon} alt="add chat room icon" />
          <span>+</span>
        </div>
      </div>
      <ul className="room__list">
        {roomList.map(room => {
          const roomUser = Object.keys(room.roomUsers).filter(singleUser => singleUser !== user.id)[0];
          const roomUserName = room.roomUsers[roomUser];
          const profileURL = baseProfileURL + room.roomProfiles[roomUser];

          return(
            <NavLink 
              to={{pathname:'/chat-room'}} 
              state={{roomID: room.roomID, roomUserID: roomUser, roomUserName: roomUserName, userID: user.id, profileURL: profileURL}}  
              className="room__item">
              <img src={ profileURL } alt="user profile" className="room__profile" />
              <div className="room__info">
                <span className="room__name">{roomUserName}</span>
                <span className="room__chat">{room.lastMessage}</span>
                <span className="room__date">{room.createdAt}</span>
              </div>
            </NavLink>
          )
        })}
      </ul>
    </div>
  </div>
  )
}

export default RoomListPage