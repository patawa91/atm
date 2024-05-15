import axios from 'axios';
import { API_BASE_URL } from '../config';
import { IAccount } from '../models/iAccount';

const api = axios.create({
    baseURL: API_BASE_URL
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  export const getAccount = async (accountNumber: number) => {
    const response = await api.get(`/account/${accountNumber}`);
    return response.data as IAccount;
  };
  
  export const withdrawal = async (accountNumber: number, amount: number) => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const response = await api.post(`/account/${accountNumber}/withdrawal`, { amount, timezone });
      return response.data as string;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if(error.response.data.errors) {
          const messages = error.response.data.errors.map((err: any) => err.msg);
          throw new Error(messages.join(', '));
        } else {
          throw new Error(error.response.data);
        }
      }
      throw error;
    }
  };

  export const deposit = async (accountNumber: number, amount: number) => {
    try {
      const response = await api.post(`/account/${accountNumber}/deposit`, { amount });
      return response.data as string;
    } catch(error) {
      if (error.response && error.response.status === 400) {
        if(error.response.data.errors) {
          const messages = error.response.data.errors.map((err: any) => err.msg);
          throw new Error(messages.join(', '));
        } else {
          throw new Error(error.response.data);
        }
      }
      throw error;
    }
  };