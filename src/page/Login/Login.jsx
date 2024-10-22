import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import style from './Login.module.css'
import { Link } from 'react-router-dom';
import { AiOutlineMail } from "react-icons/ai";

import { CiLock } from "react-icons/ci";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };





  return (
    

    <>
    <div className={style.login_container}>
      <div className={style.login_left}>
      <div className={style.login_back_icon}>
        <div className={style.login_icon}>
         
          <img src="../Art.png" alt="Art" />
          
        </div>
        </div>
        <p className={style.login_text}>Welcome aboard my friend </p>
        <p className={style.login_text1}> just a couple of clicks and we start</p>
    </div>
    <div className={style.login_right}>
      <div className={style.login_form}>
    <h1>Log in</h1>
              <div className={style.login_input}>
              <div className={style.login_input_icon}><AiOutlineMail /></div>
              <input type="text" 
                placeholder= "Email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} />

                </div>

                <div className={style.login_input}>
                <div className={style.login_input_icon}><CiLock /></div>
              
              <input type={showPassword ? "text" : "password"} 
                placeholder='Password'
                value={password} 
                onChange={(e) => setPassword(e.target.value)} />
          
              <span
                type="button"
                className={style.password_toggle_button}
                onClick={togglePasswordVisibility}>
                  
                  {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                  </span>
                  </div>

              <button className={style.btn1} onClick={() => console.log(email, password)}>Log in</button>
              <p>Have no account yet?</p>
               <Link to="/register"> <button className={style.btn2}>Register  </button></Link>
    </div>
      
    </div>
    </div>
   
      </>
  )
}
