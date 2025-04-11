import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async config => {
    await new Promise(resolve =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )

    return config
  })
}

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(env.VITE_SESSION_KEY);

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
