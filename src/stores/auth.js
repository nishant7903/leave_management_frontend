import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token') || null,
    error: null,
    loading: false
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isEmployer: (state) => state.user?.role === 'employer',
    isEmployee: (state) => state.user?.role === 'employee',
  },
  actions: {
    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.post('/auth/login', { email, password });
        this.token = response.data.accessToken;
        this.user = response.data;
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        return true;
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed';
        return false;
      } finally {
        this.loading = false;
      }
    },
    async signup(userData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.post('/auth/register', userData);
        this.token = response.data.accessToken;
        this.user = response.data;
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        return true;
      } catch (err) {
        this.error = err.response?.data?.message || 'Signup failed';
        return false;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
});
