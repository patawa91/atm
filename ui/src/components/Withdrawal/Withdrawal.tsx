import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { withdrawal } from '../../services/accountService';
import { IAccount } from '../../models/iAccount';
import { useNavigate } from 'react-router-dom';
import ContentWrap from '../ContentWrap/ContentWrap';
import { StyledButton, StyledParagraph } from '../styles';

const Withdrawal: React.FC = () => {
  const [account, setAccount] = useState<IAccount | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAccount = localStorage.getItem('account');
    if (storedAccount) {
      setAccount(JSON.parse(storedAccount));
    }
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const amountParsed = Number(amount);
      if (isNaN(amountParsed)) {
        throw new Error('Amount must be a number');
      }
      await withdrawal(account.account_number,amountParsed);
      setMessage('Withdrawal successful');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  return (
    <ContentWrap pageHeader='Withdrawal' subtitle='Please choose amout to withdraw' account={account}>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="number" step="1" value={amount} onChange={handleChange} />
          <StyledButton type="submit">Withdraw</StyledButton>
          <StyledButton onClick={() => navigate('/commands')}>Return</StyledButton>
        </form>
      </div>
      {message && <StyledParagraph>{message}</StyledParagraph>}
    </ContentWrap>
  );
}

export default Withdrawal;