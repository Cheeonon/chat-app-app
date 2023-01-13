import Header from '../../components/Header/Header';
import { useLocation } from 'react-router-dom';
import './FriendsListPage.scss';
import { useEffect, useState } from 'react';
import { getFriends, addFriends } from '../../utils/axios';
import friendIcon from '../../assets/icons/profile.svg';

const FriendsListPage = () => {

  const { state } = useLocation();
  const { user } = state;
  const [friendsList, setFriendsList] = useState(null);
  const [addFriend, setAddFriend] = useState(false);
  const profileBaseURL = "https://chat-app-apii.herokuapp.com/img/";
  const [isAdded, setIsAdded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(()=>{
    getFriends({userID: user.id})
    .then(resolve => {
      setFriendsList(resolve.data.friends);
    })
    .catch(error => {
      console.log(error)
    })
  },[user.id])

  if(!friendsList){
    return <h1>Loading....</h1>
  }

  const handleAddFriend = () => {
    setAddFriend(!addFriend);
  }

  const handleSubmitFriend = (event) => {
    event.preventDefault();
    const friendID = event.target.friend.value;

    addFriends({user: user, friendID: friendID})
    .then(resolve => {
      setFriendsList(resolve.data.friendsList);
      setIsAdded(true);

    })
    .catch(err => {
      setIsError(err.response.data.message);
    })

    setTimeout(()=>{setIsAdded(false)}, 1500);
    setTimeout(()=>{setIsError(false)}, 1500);

    event.target.reset();
  }

  return (
    <div className='friends'>
      <Header user={user}/>
      <div className="friends__content">
        <div className="friends__title-container">
          <h2 className='friends__title'>Friends</h2>
          {addFriend && 
            <form className="friends__add-field" onSubmit={(event) => {handleSubmitFriend(event)}}>
              <h3 className="friends__add-title">Add Friends</h3>
              <input name="friend" type="text" className="friends__add-input" />
              <button className="friends__add-btn">Add</button>
              {isAdded && <span className="friends__add-status">Friend has been added!</span>}
              {isError && <span className="friends__add-status">{isError}</span>}
            </form>}
          <div className="friends__add" onClick={handleAddFriend}>
            <img src={friendIcon} alt="add friend icon" />
            <span>+</span>
          </div>
        </div>
        <div className="friends__list">
          <div className="friends__me">
            <div className="friends__item">
              <img src={ profileBaseURL+user.profile } alt="user profile" className="friends__profile friends__profile--me" />
              <span className="friends__name">{user.name}</span>
            </div>
          </div>
          <ul className="friends__friends">
            <h3 className='friends__second-title'>Friends</h3>
            {friendsList.map(friend => (
              <li className="friends__item">
                <img src={ profileBaseURL+friend.profile } alt="user profile" className="friends__profile" />
                <span className="friends__name">{friend.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default FriendsListPage