// pages/results.js\
"use client";
import { useEffect,useState } from "react";
import styled from "styled-components";
import Link from "next/link"
import { useRouter } from 'next/navigation';
import axios from "axios";

const API=`https://ai-assesment-backend.onrender.com`;
const ResultsPage = () => {
  const [feedback,setFeedback]=useState(null);
  const router=useRouter();
  useEffect(()=>{
    const auth=async()=>{
      const token=sessionStorage.getItem('authToken');
    if(!token){
      router.post("/login");
    }
    try{
      await axios.get(`${API}/auth/user`,{headers:{'x-auth-token':token}})
    }catch(err){
      router.post("/login");
    }
    const storedFeedback=sessionStorage.getItem('feedback');
    if(storedFeedback!==null){
      setFeedback(JSON.parse(storedFeedback).replace(/\n/g,'<br/>'));
    }
    }
    auth();
  },[router])

  if(!feedback) return <>Loading...</>
    return (
      <Container>
        <h1>Quiz Results</h1>
        <div
        dangerouslySetInnerHTML={{ __html: feedback }}
        style={{
          backgroundColor: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      />
        <Link href="/">
          Back to Home
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
  padding:20px;
    a {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      background: #0070f3;
      color: white;
      text-decoration: none;
      border-radius: 5px;
    }
  `;
  
  export default ResultsPage;
  