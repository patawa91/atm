import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService'

const Login: React.FC = () => {
  const [accountNumber, setAccountNumber] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const token = await login(accountNumber);
    localStorage.setItem('token', token);
    navigate('/commands');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" step="1" value={accountNumber} onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;