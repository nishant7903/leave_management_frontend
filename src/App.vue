<script setup>
import Navbar from './components/Navbar.vue'
import { useAuthStore } from './stores/auth'
import { computed } from 'vue'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
    <Navbar v-if="isAuthenticated" />
    <main class="flex-grow">
      <router-view />
    </main>
  </div>
</template>
