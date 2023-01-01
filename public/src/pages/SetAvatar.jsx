import React, {useState, useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import styled from "styled-components";
import loader from "../assets/loader.gif";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from '../utils/APIRoutes';
import {Buffer} from 'buffer'
export default function SetAvatar(){
    const api = 'https://api.multiavatar.com'
    const apiKey = "?apikey=PKzpmycYjN2hxS"
    const navigate = useNavigate();
    const [avatars,setAvatars] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [selectedAvatar,setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable: true,
        theme: 'dark',
        }
    useEffect(() => {
      if(!localStorage.getItem('chat-app-user')){
        navigate('/login');
      };
    }, [navigate]);

    const setProfilePicture = async () => {
      if(selectedAvatar===undefined){
        toast.error("Select an avatar!", toastOptions);
      } else {
        const user = await JSON.parse(localStorage.getItem("chat-app-user"));
        const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
          image: avatars[selectedAvatar],
        });

        if(await data.isSet){
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem("chat-app-user",JSON.stringify(user));
          navigate('/');
        } else {
          toast.error("Error setting avatar.", toastOptions);
        }
      }
    };

    useEffect(() => {
    const data = [];
    for (let i = 0; i < 4; i++) {
        async function fetchData() {
            const image = await axios.get(
                `${api}/${Math.round(Math.random() * 1000)}${apiKey}`
              );
              const buffer = new Buffer(image.data);
              return buffer;
          }   
        var buffer = fetchData();
        var done = 0;
        Promise.resolve(buffer).then(
            (value) => {
                data.push(value.toString("base64"));
                done = done + 1;
                if (done === 4){
                        setIsLoading(false);
                        setAvatars(data);
                }
            },
        );
    }   
  }, []);
  return (
    <>
        {isLoading ? (
        <Container style={{backgroundColor: "black"}}>
            <img src={loader} alt="loader" className="loader" />
        </Container>
        ) : (
        <Container>
          <div className="square">
            <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
            </div>
            <div className="avatars">
            {avatars.map((avatar, index) => {
                return (
                <div
                    key={index}
                    className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                    }`}
                >
                    <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                    />
                </div>
                );
            })}
            </div>
            <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
            </button>
            </div>
            <ToastContainer />
        </Container>
        )}
    </>
    )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #6482d4;
  height: 100vh;
  width: 100vw;
  .square {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 3rem;
    padding: 3rem;
    background-color: #3b3b3b;
    border-radius: 2rem; 
  }

  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
      text-decoration-color: orange;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid orange;
    }
  }
  .submit-btn {
    background-color: #ffffff;
    color: #000000;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    border: 0.2rem solid orange;
    &:hover {
      background-color: orange;
    }
  }
`;
