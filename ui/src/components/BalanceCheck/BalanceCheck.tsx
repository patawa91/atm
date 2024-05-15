import React, { useEffect, useState } from 'react';
import { getAccount } from '../../services/accountService';
import { IAccount } from '../../models/iAccount';
import { useNavigate } from 'react-router-dom';
import ContentWrap from '../ContentWrap/ContentWrap';
import { StyledButton, StyledParagraph } from '../styles';

const BalanceCheck: React.FC = () => {
  const [account, setAccount] = useState<IAccount | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAccount = localStorage.getItem('account');
    if (storedAccount) {
      setAccount(JSON.parse(storedAccount));
    }
  }, []);

  const handleCheckBalance = async () => {
    setIsLoading(true);
    try {
      const newAccount = await getAccount(account.account_number);
      localStorage.setItem('account', JSON.stringify(newAccount));
      setAccount(newAccount);
      setBalance(newAccount.amount);
      setMessage('Balance check successful');
    } catch (error) {
        setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContentWrap pageHeader='Balance Check' account={account}>
      <div>
        <StyledButton onClick={handleCheckBalance} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Check Balance'}
        </StyledButton>
        <StyledButton onClick={() => navigate('/commands')}>Return</StyledButton>
        {balance !== null && <StyledParagraph>Balance: ${balance}</StyledParagraph>}
      </div>
    </ContentWrap>
  );
}

export default BalanceCheck;