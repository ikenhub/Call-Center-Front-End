import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { login } from '../Services/authService'; 

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const data = await login(credentials);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user)); // Store user object in local storage
      navigate('/dashboard'); // Redirect to a dashboard or some other page after successful login
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
