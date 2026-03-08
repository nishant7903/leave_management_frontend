<script setup>
import { useAuthStore } from '../stores/auth'
import EmployeeDashboard from './employee/DashboardView.vue'
import EmployerDashboard from './employer/DashboardView.vue'

const authStore = useAuthStore()
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 capitalize">{{ authStore.user?.role }} Dashboard</h1>
      <p class="mt-2 text-sm text-gray-600">
        Welcome back, <span class="font-semibold">{{ authStore.user?.firstName }}</span>! Here is the overview of leave requests.
      </p>
    </div>

    <!-- Conditional rendering based on role -->
    <EmployerDashboard v-if="authStore.isEmployer" />
    <EmployeeDashboard v-else />
  </div>
</template>
