import axios from 'axios';

export async function login(accountNumber: string) {

  const response = await axios.post('/auth/login', { accountNumber });
  return response.data.token;
}