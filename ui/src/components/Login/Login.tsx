import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService'
import { getAccount } from '../../services/accountService';
import ContentWrap from '../ContentWrap/ContentWrap';
import { StyledButton, StyledParagraph } from '../styles';

const Login: React.FC = () => {
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const accountNumberParsed = Number(accountNumber);
      if (isNaN(Number(accountNumberParsed))) {
        throw new Error('Account number must be a number');
      }
      const token = await login(accountNumberParsed);
      localStorage.setItem('token', token);
      const account = await getAccount(accountNumberParsed);
      localStorage.setItem('account', JSON.stringify(account));
      navigate('/commands');
    }catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Unauthorized: Please check your account number');
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(event.target.value);
  };

  return (
    <ContentWrap pageHeader='Login' subtitle="Please enter your account number">
      <form onSubmit={handleSubmit}>
        <input type="number" step="1" value={accountNumber} onChange={handleChange} />
        <StyledButton type="submit">Login</StyledButton>
      </form>
      {errorMessage && <StyledParagraph className="error-message">{errorMessage}</StyledParagraph>}
    </ContentWrap>
  );
}

export default Login;