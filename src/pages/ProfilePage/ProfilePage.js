import './ProfilePage.scss';
import { useLocation, Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useState } from 'react';
import { changeUserName } from '../../utils/axios';

const ProfilePage = () => {

  const { state } = useLocation();
  const { user } = state;
  const baseProfileURL = "https://chat-app-api-production-65ff.up.railway.app/img/";
  const [userName, setUserName] = useState(user.name);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleSaveName = (event) => {
    const newName = event.target.value;

    changeUserName({newName: newName, userID: user.id})
    .then(resolve => {
      setUserName(resolve.data.newName);
      setIsEditing(false);
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div className='profile'>
      <Header user={user}/>
      <div className="profile__content">
        <h2 className="profile__title">Manage Profile</h2>
        <div className="profile__profile">
          <img src={ baseProfileURL + user.profile } alt="user profile" className="profile__img" />
          <div className="profile__name-container">
            {
              isEditing
              ? (
                <>
                  <input className="profile__name profile__name-edit" placeholder="Enter a new name." onBlur={(event) => {handleSaveName(event)}}></input>
                  <p className="profile__name-notice"> Re-login to apply the change</p>
                </>
                )
              : <span className="profile__name">{userName}</span>
            }
          </div>
          <button className="profile__btn" onClick={handleEdit}>Edit</button>
        </div>
        <div className="profile__info">
          <span className="profile__second-title">Account</span>
          <span className="profile__account">{user.id}</span>
        </div>
        <div className="profile__info">
          <span className="profile__second-title">Joined</span>
          <span className="profile__account">{user.joined}</span>
        </div>
        <div className="profile__info">
          <Link to="/" className="profile__btn">Logout</Link>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage