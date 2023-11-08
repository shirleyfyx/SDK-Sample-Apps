import React from 'react';
import CredentialsForm from "../../components/CredentialsForm";

export const Login = () => {
  const handleCredentialsSubmit = (credentials) => {
    console.log('Form submitted with:', credentials);
  };

  return (
    <div>
      <CredentialsForm onSubmit={handleCredentialsSubmit} />
    </div>
  );
};

export default Login;
