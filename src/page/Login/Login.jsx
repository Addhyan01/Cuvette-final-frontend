import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import style from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMail } from "react-icons/ai";
import { login } from '../../api/Api';
import { setToken } from '../../utlis/auth';
import { CiLock } from "react-icons/ci";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  
  const errorStyle = {
    color: 'red',
    fontSize: '0.9em',
    padding: '0',
    margin: '0',
    textAlign: 'left',

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      try {
        const { data } = await login({ email, password });
        setToken(data.token);
        navigate('/dashboard');
      } catch (error) {
        alert('Login failed');
      }
    }
  };

  

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
                {emailError && <p style={errorStyle}>{emailError}</p>}

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
                  {passwordError && <p className={style.error}>{passwordError}</p>}
                 

              <button className={style.btn1} onClick={handleSubmit}>Log in</button>
              <p>Have no account yet?</p>
               <Link to="/register"> <button className={style.btn2}>Register  </button></Link>
    </div>
      
    </div>
    </div>
   
      </>
  )
}
