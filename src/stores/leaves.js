import { defineStore } from 'pinia';
import api from '../services/api';

export const useLeavesStore = defineStore('leaves', {
  state: () => ({
    leaves: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchLeaves() {
      this.loading = true;
      this.error = null;
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const endpoint = user.role === 'employer' ? '/leaves/all' : '/leaves/my-leaves';
        const response = await api.get(endpoint);
        this.leaves = response.data.data || response.data;
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch leaves';
      } finally {
        this.loading = false;
      }
    },
    async applyLeave(leaveData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.post('/leaves/apply', leaveData);
        this.leaves.unshift(response.data.data || response.data);
        return true;
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to apply leave';
        return false;
      } finally {
        this.loading = false;
      }
    },
    async updateLeaveStatus(id, status) {
      try {
        const response = await api.patch(`/leaves/${id}/status`, { status });
        const index = this.leaves.findIndex(l => l._id === id);
        if (index !== -1) {
          this.leaves[index] = response.data.data || response.data;
        }
        return true;
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to update leave status';
        return false;
      }
    }
  }
});
