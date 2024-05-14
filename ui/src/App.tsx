// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Commands from './components/Commands/Commands';
import BalanceCheck from './components/BalanceCheck/BalanceCheck';
import Withdrawal from './components/Withdrawal/Withdrawal';
import Deposit from './components/Deposit/Deposit';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/commands" element={<Commands />} />
        <Route path="/balance-check" element={<BalanceCheck />} />
        <Route path="/withdrawal" element={<Withdrawal />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/" element={<Navigate to="/login" />} /> {}
      </Routes>
    </Router>
  );
}

export default App;