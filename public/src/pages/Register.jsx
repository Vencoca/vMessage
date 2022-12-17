import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';
function Register() {
  const navigate = useNavigate();
  const [values,setValues]=useState({
    username: "",
    email: "",
    password: "",
    confirmPassowrd: "",
  });
  const toastOptions = {
    position:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable: true,
    theme: 'dark',
    }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()){
      const {password,username,email} = values;
      const {data} = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if(data.status===false){
        toast.error(data.msg, toastOptions);
      } else {
        localStorage.setItem('chat-app-user',JSON.stringify(data.user));
        navigate("/");
      } 
    };
  }
  const handleChange = (event) => {
    setValues({...values,[event.target.name]:event.target.value});
  }

  const handleValidation = (event) => {
    const {password,confirmPassword,username,email} = values;
    if(password !== confirmPassword){
      toast.error("Password and confirm password should be same!", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be longer than 3 chars!", toastOptions);
      return false;
    } else if (password.length < 8){
      toast.error("Username should be longer than 8 chars!", toastOptions);
      return false;
    } else if (email === ""){
      toast.error("Email cant be empty!", toastOptions);
      return false;
    }
    return true;
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={(event)=>handleSubmit(event)}>
          <div className='brand'>
            <img src={Logo} alt='Logo' />
            <h1>vMessage</h1>
          </div>
          <input type="text" placeholder='Username' name='username' onChange={e=>handleChange(e)}/>
          <input type="email" placeholder='Email' name='email' onChange={e=>handleChange(e)}/>
          <input type="password" placeholder='Password' name='password' onChange={e=>handleChange(e)}/>
          <input type="password" placeholder='Confirm password' name='confirmPassword' onChange={e=>handleChange(e)}/>
          <button type='submit'>Create User</button>
          <span>Already have an account?<Link to={"/login"}> Login</Link></span>
        </form>
      </FormContainer>
      <ToastContainer/>
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #6482d4;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img{
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #3b3b3b;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid, orange;
      border-radius: 0.4rem;
      color: white;

    }
    button {
      padding: 1rem;
      border-radius: 0.4rem;
      font-size: 16px;
      font-weight: 700;
      text-transform: uppercase;
    }
    span{
      color: white;
      display: flex;
      justify-content: center;
      a{
        color: wheat;
        padding-left: 10px;
      }
    }
  }
`;


export default Register