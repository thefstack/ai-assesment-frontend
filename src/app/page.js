// pages/index.js
"use client";
import Link from 'next/link';
import styled from 'styled-components';

const HomePage = () => {
  
  return (
    <Container>
      <h1>Welcome to Quiz Assesment</h1>
      <Link href="/quiz">
        Start Quiz
      </Link>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  margin-top: 50px;
  min-height:100vh;
  display:flex;
  align-items:center;
  flex-direction:column;
  justify-content:center;
  gap:50px;
  a {
    display: inline-block;
    padding: 10px 20px;
    background: #0070f3;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-size: 18px;
  }
`;

export default HomePage;
