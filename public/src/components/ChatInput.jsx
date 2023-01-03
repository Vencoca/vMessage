import React, {useState} from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'

const ChatInput = ({handleSendMsg}) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (event,emoji) => {
        let message = msg;
        message += emoji.emoji;
        setMsg(message);
    }

    const sendChat = (event) => {
        event.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg);
            setMsg('');
        }
    }

    return (
    <Container>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>}
            </div>
        </div>
        <form className='input-container' onSubmit={(e) => sendChat(e)}>
            <input type="text" placeholder='type your message here' value={msg} onChange={(e)=>setMsg(e.target.value)}/>
            <button className="submit">
                <IoMdSend/>
            </button>
        </form>
    </Container>
    );
}

export default ChatInput;

const Container = styled.div`
display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #676767;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  @media screen and (max-width: 600px) {
        padding: 0.0rem 0.5rem;
        grid-template-columns: 12% 88%;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      
      svg {
        font-size: 1.5rem;
        color: yellow;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        //background-color: #080420;
        box-shadow: 0 5px 10px #ec8c10;
        border-color: #ec8c10;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          width: 5px;
          &-thumb {
            background-color: #ec8c10;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #ec8c10;
        }
      }
    }
  }
  .input-container {
    @media screen and (max-width: 600px) {
      gap: 0rem;
    }
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: white;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: black;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      @media screen and (max-width: 600px) {
        font-size: 0.8rem;
      }
      &::selection {
        background-color: #ec8c10;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ec8c10;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      @media screen and (max-width: 600px) {
        padding: 0.3rem 0.5rem;
      }
      svg {
        font-size: 2rem;
        color: white;
        @media screen and (max-width: 600px) {
          font-size: 1.4rem;
        }
      }
    }
  }
`;
