import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contact from '../components/Contact';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContats] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  
  useEffect(() =>{
    const fetchData = async() => {
      if(!localStorage.getItem('chat-app-user')){
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
      };
    }
    fetchData();
  }, [])

  useEffect(() => {
    if(currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async() => {
      if(currentUser) {
        if(currentUser.isAvatarImageSet){
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContats(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    fetchData();
  },[currentUser,navigate]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return <Container>
    <div className="container">
      <Contact contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
      {currentChat === undefined ? (
        <Welcome currentUser={currentUser}/>
        ): (
          <ChatContainer currentChat={currentChat} currentUser={currentUser}  socket={socket}/>
        )}
    </div>
  </Container>;
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #6482d4;
  .container{
    @media screen and (max-width: 600px) {
      height: 100vh;
      width: 100vw;
      h1{
        font-size: 20px;
      }
      h2 {
        font-size: 15px;
      }
      h3 {
        font-size: 10px;
      }
      p {
        font-size: 11px;
      }
    }
    height: 85vh;
    width: 85vw;
    background-color: #3b3b3b;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width:720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
      
    }
  }


`;

export default Chat