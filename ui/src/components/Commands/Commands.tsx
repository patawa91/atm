import React from 'react';
import { Link } from 'react-router-dom';

const Commands: React.FC = () => {
  return (
    <div>
      <Link to="/balance-check">Balance Check</Link>
      <Link to="/withdrawal">Withdrawal</Link>
      <Link to="/deposit">Deposit</Link>
    </div>
  );
}

export default Commands;