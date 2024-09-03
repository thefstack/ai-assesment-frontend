"use client";
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
        console.log(data)
      const response = await axios.post('https://ai-assesment-backend.onrender.com/auth/login', data);
      sessionStorage.setItem('authToken', response.data.token);
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
    setLoading(false);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <InputWrapper>
          <Label>Email</Label>
          <Input
            type="email"
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </InputWrapper>
        <InputWrapper>
          <Label>Password</Label>
          <Input
            type="password"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </InputWrapper>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </SubmitButton>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  padding: 20px;
`;

const Form = styled.form`
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 400px;

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
`;

const InputWrapper = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  background: ${props => (props.error ? '#fdd' : '#fff')};
`;

const Error = styled.div`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
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

  &:disabled {
    background: #a0a0a0;
    cursor: not-allowed;
  }
`;

export default LoginPage;
