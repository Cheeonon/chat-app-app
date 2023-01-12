import './LoginPage.scss';
import messageIcon from '../../assets/icons/message.svg';
import { Link, useNavigate} from 'react-router-dom';
import {login} from '../../utils/axios';
import { useEffect, useState } from 'react';

const LoginPage = () => {
  const [isValid, setIsValid] = useState(false);
  const [btnClass, setBtnClass] = useState("login__btn");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  // for button styling 
  useEffect(()=>{
    if(isValid){
      setBtnClass("login__btn login__btn--valid")
    } else{
      setBtnClass("login__btn")
    }
  }, [isValid])

  // to set the button active / inactive
  const handleChange = () => {
    const email = document.querySelector("input[name='email'").value;
    const password = document.querySelector("input[name='password'").value;
  
    if(email && password){
      setIsValid(true);
    } else{
      setIsValid(false);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = event.target.email.value;
    const password = event.target.password.value;

    if(id && password){
      login({userID: id, userPassword: password})
        .then((resolve)=>{
          navigate("/friends", {
            state: {
             user: resolve.data.user
            }
          });
        })
        .catch((error)=>{
          const errorMessage = error.response.data.message;
          setIsError(false);
          setTimeout(()=>{
              setIsError(errorMessage);
          }, 100)
        })
    }
  };
  
  return (
    <div className='login'>
      <img src={messageIcon} alt="message icon" className="login__icon" />
      <form action="" className="login__form" onSubmit={(event) => {handleSubmit(event)}} onChange={(event)=>{handleChange(event)}}>
        <div className="login__field">
          <input type="email" placeholder='Email' name="email" className="login__input" />
          <input type="password" placeholder='Password' name="password" className="login__input" />
        </div>
        {isError && <span className="login__error">{isError}</span>}
        <button className={btnClass}>Log in</button>
      </form>
      <Link to="/sign-up" className='login__login'>Sign Up</Link>
    </div>
  )
}

export default LoginPage