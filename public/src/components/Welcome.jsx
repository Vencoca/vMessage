import React from 'react';
import styled from 'styled-components';
import welcome from "../assets/welcome.gif";

export default function Welcome({currentUser}){
    if (currentUser === undefined){
        return(
            <>
            </>
        )
    }
    return(
    <>
    <Container>
        <img src={welcome} alt="Welcome gif"/>
        <h1>
         Welcome <span>{currentUser.username}</span> !
        </h1>
        <h3>Please select chat to start messaging</h3>
    </Container>
    </>
)};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img{
        height: 20rem;
        padding-bottom: 3rem;
    }
    span{
        color:orange;
    }
`;