import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledHeader, Subtitle, CenterContainer, TopBlock, StyledButton, BottomBlock, MainContent } from '../styles';
import { IAccount } from '../../models/iAccount';

interface WrapProps {
  pageHeader: string;
  subtitle?: string;
  account?: IAccount | null;
  children: React.ReactNode;
}

const ContentWrap: React.FC<WrapProps> = ({ pageHeader, subtitle, account, children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('account');
    navigate('/login');
  };

  return (
  <CenterContainer>
      <TopBlock>
        <p>ACME Bank</p>
        {account &&(
          <div>
            <span>Account Number: {account.account_number}</span> | <span>Name: {account.name}</span> | <span>Type: {account.type}</span>
          </div>
          )}
      </TopBlock>
      <MainContent>
        <StyledHeader>{pageHeader}</StyledHeader>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        {children}
      </MainContent>
      <BottomBlock>
        <StyledButton onClick={handleLogout}>Logout</StyledButton>
      </BottomBlock>
    </CenterContainer>
  );
}

export default ContentWrap;