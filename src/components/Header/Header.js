import './Header.scss';
import friends from '../../assets/icons/profile.svg';
import message from '../../assets/icons/message.svg';
import threeDots from '../../assets/icons/three-dots.png';
import { NavLink } from 'react-router-dom';


const Header = ({user}) => {

  return (
    <div className='header'>
        <ul className="header__list">
            <li className="header__item">
                <NavLink  
                    to={{pathname:'/friends'}} 
                    state={{user: user}}  
                    exact activeclassname='active' className="header__link"> 
                    <img src={friends} alt="" className="header__icon" />
                </NavLink>
            </li>
            <li className="header__item">
                <NavLink  
                    to={{pathname:'/rooms'}} 
                    state={{user: user}}  
                    exact activeclassname='active' className="header__link"> 
                    <img src={message} alt="" className="header__icon" />
                </NavLink>
            </li>
            <li className="header__item">
                <NavLink  
                    to={{pathname:'/profile'}} 
                    state={{user: user}}  
                    exact activeclassname='active' className="header__link"> 
                    <img src={threeDots} alt="" className="header__icon header__icon--scale-up" />
                </NavLink>
            </li>
        </ul>
    </div>
  )
}

export default Header