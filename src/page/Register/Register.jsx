

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";

import style from './Register.module.css'
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { CiLock } from "react-icons/ci";




export default function Register() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility_confirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
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
           
           
            <h1>Register</h1>
            <div className={style.login_input}>
              <div className={style.login_input_icon}><FaRegUser /></div>
              <input type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)} />
              </div>

            <div className={style.login_input}>
            <div className={style.login_input_icon}><AiOutlineMail /></div>
                
            
            <input type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            </div>


            <div className={style.login_input}>
            <div className={style.login_input_icon}><CiLock />
            </div>
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

            <div className={style.login_input}>
            <div className={style.login_input_icon}><CiLock /></div>
            <input type={showPasswordConfirm ? "text" : "password"}
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} />

            <span
              type="button"
              className={style.password_toggle_button_confirm}
              onClick={togglePasswordVisibility_confirm}>

              {showPasswordConfirm ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </span>
            </div>
            

            <button className={style.btn1}>Register</button>

            <p>Have an account ?</p>
            <Link to="/login"><button className={style.btn2}> Login </button></Link>
          </div>

        </div>
      </div>

    </>
  )
}
