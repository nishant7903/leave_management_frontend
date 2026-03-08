<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

const user = computed(() => authStore.user)
const isEmployer = computed(() => authStore.isEmployer)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="bg-indigo-600 text-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo/Home Link -->
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/dashboard" class="text-xl font-bold tracking-wider">LMS</router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
          <router-link 
            to="/dashboard" 
            class="text-indigo-100 hover:text-white px-3 py-2 rounded-md font-medium transition-colors"
            active-class="bg-indigo-700 text-white">
            Dashboard
          </router-link>
          
          <router-link 
            v-if="!isEmployer"
            to="/apply-leave" 
            class="text-indigo-100 hover:text-white px-3 py-2 rounded-md font-medium transition-colors"
            active-class="bg-indigo-700 text-white">
            Apply Leave
          </router-link>
        </div>

        <!-- User Actions -->
        <div class="flex items-center space-x-4">
          <div class="hidden sm:block">
            <span class="text-indigo-200 text-sm">Welcome, </span>
            <span class="font-semibold">{{ user?.firstName || 'User' }}</span>
            <span class="ml-2 px-2 py-0.5 rounded-full bg-indigo-500 text-xs font-medium uppercase tracking-wider">
              {{ user?.role }}
            </span>
          </div>
          <button 
            @click="handleLogout"
            class="bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white transition-colors px-4 py-2 rounded-md text-sm font-medium">
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
