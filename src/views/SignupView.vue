<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const firstName = ref('')
const lastName = ref('')
const empId = ref('')
const dob = ref('')
const email = ref('')
const password = ref('')
const role = ref('employee')

const handleSignup = async () => {
  const success = await authStore.signup({
    firstName: firstName.value,
    lastName: lastName.value,
    empId: empId.value,
    dob: dob.value,
    email: email.value,
    password: password.value,
    role: role.value
  })
  
  if (success) {
    router.push('/dashboard')
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
      <div>
        <h2 class="mt-2 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Create an account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
            sign in to your existing account
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSignup">
        <div v-if="authStore.error" class="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p class="text-sm text-red-700">{{ authStore.error }}</p>
        </div>
        
        <div class="rounded-md shadow-sm space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input id="firstName" name="firstName" type="text" required
                v-model="firstName"
                class="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="John" />
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input id="lastName" name="lastName" type="text" required
                v-model="lastName"
                class="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Doe" />
            </div>
          </div>
          <div>
            <label for="empId" class="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
            <input id="empId" name="empId" type="text" required
              v-model="empId"
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="EMP123" />
          </div>
          <div>
            <label for="dob" class="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input id="dob" name="dob" type="date" required
              v-model="dob"
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label for="email-address" class="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required
              v-model="email"
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email address" />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input id="password" name="password" type="password" autocomplete="new-password" required
              v-model="password"
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">I am registering as an:</label>
            <div class="flex items-center space-x-6">
              <div class="flex items-center">
                <input id="role-employee" name="role" type="radio" value="employee" v-model="role"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                <label for="role-employee" class="ml-2 block text-sm font-medium text-gray-700">
                  Employee
                </label>
              </div>
              <div class="flex items-center">
                <input id="role-employer" name="role" type="radio" value="employer" v-model="role"
                  class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                <label for="role-employer" class="ml-2 block text-sm font-medium text-gray-700">
                  Employer
                </label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button type="submit" :disabled="authStore.loading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all">
            <span v-if="authStore.loading">Creating account...</span>
            <span v-else>Sign up</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
