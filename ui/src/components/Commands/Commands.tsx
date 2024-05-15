import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IAccount } from '../../models/iAccount';
import ContentWrap from '../ContentWrap/ContentWrap';
import { StyledLink } from '../styles';

const Commands: React.FC = () => {
  const [account, setAccount] = useState<IAccount | null>(null);

  useEffect(() => {
    const storedAccount = localStorage.getItem('account');
    if (storedAccount) {
      setAccount(JSON.parse(storedAccount));
    }
  }, []);
  return (
    <ContentWrap pageHeader='Options' subtitle="Please select your option" account={account}>
      <div>
        <StyledLink to="/balance-check">Balance Check</StyledLink>
        <StyledLink to="/withdrawal">Withdrawal</StyledLink>
        <StyledLink to="/deposit">Deposit</StyledLink>
      </div>
    </ContentWrap>
  );
}

export default Commands;