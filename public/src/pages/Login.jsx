import React, {useState, useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';
function Login() {
  const navigate = useNavigate();
  const [values,setValues]=useState({
    username: "",
    password: "",
  });
  const toastOptions = {
    position:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable: true,
    theme: 'dark',
    };
  useEffect(() => {
    if(localStorage.getItem('chat-app-user')){
      navigate('/');
    };
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()){
      const {password,username} = values;
      const {data} = await axios.post(loginRoute, {
        username,
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
    if(password === ""){
      toast.error("Username and Password is required", toastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("Username and Password is required", toastOptions);
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
          <input type="text" placeholder='Username' name='username' onChange={e=>handleChange(e)} min="3"/>
          <input type="password" placeholder='Password' name='password' onChange={e=>handleChange(e)}/>
          <button type='submit'>Log in</button>
          <span>Dont have an account?<Link to={"/register"}> Sign up</Link></span>
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


export default Login