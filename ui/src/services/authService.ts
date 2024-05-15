import axios from 'axios';
import { API_BASE_URL } from '../config';
import { API_USERNAME } from '../config';
import { API_PASSWORD } from '../config';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export async function login(accountNumber: number) {
  const response = await api.post('/auth/login', { username: API_USERNAME, password: API_PASSWORD, accountNumber });
  return response.data.token;
}