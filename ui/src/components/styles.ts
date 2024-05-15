import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const TopBlock = styled.div`
  background-color: #123456;
  padding: 20px 0;
  text-align: center;
  color: #ffffff;
  width: 100%;
`;

export const MainContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BottomBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  background-color: #123456;
  color: #ffffff;
  width: 100%;
`;

export const StyledHeader = styled.h1``;

export const Subtitle = styled.h2`
  text-align: center;
  color: #654321;
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const StyledLink = styled(Link)`
  display: inline-block;
  background-color: #123456;
  color: #ffffff;
  text-decoration: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #654321;
  }
`;

export const StyledButton = styled.button`
  display: inline-block;
  background-color: #123456;
  color: #ffffff;
  text-decoration: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #654321;
  }

  &:disabled {
    background-color: #999999;
    cursor: not-allowed;
  }
`;

export const StyledParagraph = styled.p`
  text-align: center;
  font-size: 1.5em;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
`;