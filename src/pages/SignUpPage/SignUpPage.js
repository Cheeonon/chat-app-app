import "./SignUpPage.scss";
import { useEffect, useState } from 'react';
import { signUp } from '../../utils/axios';
import { Link } from "react-router-dom";

const SignUpPage = () => {

    const [isValid, setIsValid] = useState(false);
    const [btnClass, setBtnClass] = useState("sign-up__btn");
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [isError, setIsError] = useState(false);

    // for button styling 
    useEffect(()=>{
        if(isValid){
        setBtnClass("sign-up__btn sign-up__btn--valid")
        } else{
        setBtnClass("sign-up__btn")
        }
    }, [isValid])

    // to set the button active / inactive
    const handleChange = () => {
      const name = document.querySelector("input[name='name']").value;
      const email = document.querySelector("input[name='email']").value;
      const password = document.querySelector("input[name='password']").value;
    
      if(name && email && password){
        setIsValid(true);
      } else{
        setIsValid(false);
      }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const id = event.target.email.value;
        const password = event.target.password.value;
    
        if(name && id && password){
            signUp({userName:name, userID: id, userPassword: password})
            .then((resolve)=>{
                setIsSignedUp(true);
                setIsError(false);
            })
            .catch((error) =>{
                const errorMessage = error.response.data.message;
                setIsError(false);
                setTimeout(()=>{
                    setIsError(errorMessage);
                }, 100)
            });
        }
      };

  return (
    <div className='sign-up'>
        {isSignedUp && 
            <div className="sign-up__success">
                <div className="sign-up__success-msg">
                    <span className="sign-up__success-text">Successfully signed up!</span>
                    <Link className="sign-up__success-back" to="/">Back to Login ↵</Link>
                </div>
            </div>
        }
      <form action="" className="sign-up__form" onSubmit={(event) => {handleSubmit(event)}} onChange={(event)=>{handleChange(event)}}> 
        <div className="sign-up__field">
          <input type="text" placeholder='Name' name="name" className="sign-up__input" />
          <input type="email" placeholder='Email' name="email" className="sign-up__input" />
          <input type="password" placeholder='Password' name="password" className="sign-up__input" />
        </div>
        {isError && <span className="sign-up__error">{isError}</span>}
        <button className={btnClass}>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpPage