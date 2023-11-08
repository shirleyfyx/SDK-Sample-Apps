import React from 'react';
import { useNavigate } from 'react-router-dom';
import CredentialsForm from "../../components/CredentialsForm";

export const Login = () => {
    const navigate = useNavigate();

    const handleCredentialsSubmit = (credentials) => {

    console.log('Form submitted with:', credentials);

    navigate('/menu', {state: {credentials}} );
  };

  return (
    <div>
      <CredentialsForm onSubmit={handleCredentialsSubmit} />
    </div>
  );
};

export default Login;
