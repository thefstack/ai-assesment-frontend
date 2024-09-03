"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { set, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const QuizPage = () => {
  const [quiz, setQuiz] = useState(null);
  const { register, handleSubmit } = useForm();
  const [loading,setLoading]=useState(false);

  const router=useRouter();

  const API = `https://ai-assesment-backend.onrender.com`;
  

  useEffect(() => {
    // Fetch quiz data
    const token=sessionStorage.getItem('authToken') || '';
    const checkAuth=async()=>{
      
    if(!token){
      router.push('/login')
    }
    try{
      await axios.get(`${API}/auth/user`,{
        headers:{'x-auth-token':token}
      });
    }catch(err){
      if(err){
        console.log(err)
        router.push("/login");
      }
    }
    axios.get(`${API}/api/quizzes/`,{headers:{'x-auth-token':token}}).then((response) => {
      setQuiz(response.data[0]);
    });
    }
    checkAuth();
  }, [router]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const userAnswers = Object.values(data);
      const token=sessionStorage.getItem('authToken');
      const response = await axios.post(`${API}/api/quizzes/generate-feedback`,{
        quiz,
        userAnswers,
      },{headers:{'x-auth-token':token}});

      sessionStorage.setItem('feedback', JSON.stringify(response.data.feedback));
      setLoading(false);
      router.push('/result');
    } catch (error) {
      setLoading(false)
      console.error('Error submitting quiz:', error);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{quiz.title}</h1>
        {quiz.questions.map((question, index) => (
          <QuestionBlock key={index}>
            <Question>{question.question}</Question>
            {question.options.map((option, i) => (
              <Label key={i}>
                <input
                  type="radio"
                  name={`${index}`}
                  value={i}
                  {...register(`${index}`, { required: true })}
                />
                {option}
              </Label>
            ))}
          </QuestionBlock>
        ))}
        <SubmitButton type="submit">{loading ?"Please Wait..." :"Submit"}</SubmitButton>
      </form>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  max-width: 600px;
  margin: auto;
  display: flex;
  justify-content: center;
  margin-top:50px;
  background: #f5f5f5;
  border-radius:15px;
  h1{
    text-align:center;
    margin-bottom:20px;
  }
`;

const QuestionBlock = styled.div`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Question = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  cursor: pointer;

  input {
    margin-right: 10px;
  }

  &:hover {
    color: #0070f3;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: background 0.3s ease;

  &:hover {
    background: #005bb5;
  }
`;

export default QuizPage;
