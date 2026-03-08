<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLeavesStore } from '../../stores/leaves'

const router = useRouter()
const leavesStore = useLeavesStore()

const leaveType = ref('Sick Leave')
const startDate = ref('')
const endDate = ref('')
const reason = ref('')
const errorMsg = ref('')

const handleApplyLeave = async () => {
  errorMsg.value = ''
  
  if (new Date(startDate.value) > new Date(endDate.value)) {
    errorMsg.value = 'End date cannot be earlier than start date.'
    return
  }

  const success = await leavesStore.applyLeave({
    leaveType: leaveType.value,
    startDate: startDate.value,
    endDate: endDate.value,
    reason: reason.value
  })

  if (success) {
    router.push('/dashboard')
  } else {
    errorMsg.value = leavesStore.error || 'Failed to submit leave request.'
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8 flex items-center">
      <router-link to="/dashboard" class="text-indigo-600 hover:text-indigo-800 mr-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Back
      </router-link>
      <h1 class="text-3xl font-bold text-gray-900">Apply for Leave</h1>
    </div>

    <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <form @submit.prevent="handleApplyLeave" class="p-8 space-y-6">
        <div v-if="errorMsg" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r">
          <p class="text-sm text-red-700">{{ errorMsg }}</p>
        </div>

        <div>
          <label for="leaveType" class="block text-sm font-semibold text-gray-700 mb-2">Leave Type</label>
          <select id="leaveType" v-model="leaveType" required
            class="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-50 border">
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Earned Leave">Earned Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
            <option value="Unpaid Leave">Unpaid Leave</option>
          </select>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label for="startDate" class="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
            <input type="date" id="startDate" v-model="startDate" required
              class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50" />
          </div>

          <div>
            <label for="endDate" class="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
            <input type="date" id="endDate" v-model="endDate" required
              class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50" />
          </div>
        </div>

        <div>
          <label for="reason" class="block text-sm font-semibold text-gray-700 mb-2">Reason (Optional)</label>
          <textarea id="reason" v-model="reason" rows="4"
            placeholder="Briefly explain the reason for your leave..."
            class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50 resize-none"></textarea>
        </div>

        <div class="pt-4 border-t border-gray-100 flex justify-end">
          <router-link to="/dashboard" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3">
            Cancel
          </router-link>
          <button type="submit" :disabled="leavesStore.loading"
            class="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
            <span v-if="leavesStore.loading">Submitting...</span>
            <span v-else>Submit Request</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
