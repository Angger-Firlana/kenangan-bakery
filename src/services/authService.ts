import {api} from '../services/axios';
import type { LoginResponse } from '../types/login';

// src/modules/services/authService.js

  export const login = async (login: string, password: string) : Promise<LoginResponse> => {
    // Implementasi login
    const response = await api.post('/auth/login', { login, password });
    return response.data;
  }

  export const register = async (username: string, email: string, password: string) : Promise<LoginResponse> => {
    // Implementasi register
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  }
