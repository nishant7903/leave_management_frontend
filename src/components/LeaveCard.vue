<script setup>
import StatusBadge from './StatusBadge.vue'
import { computed } from 'vue'

const props = defineProps({
  leave: {
    type: Object,
    required: true
  },
  isEmployer: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update-status'])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const handleAction = (status) => {
  emit('update-status', props.leave._id, status)
}
</script>

<template>
  <div class="bg-white shadow-sm rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 capitalize">{{ leave.leaveType || 'General' }}</h3>
        <p v-if="isEmployer && leave.employeeId" class="text-sm text-gray-500 mt-1 font-medium">
          Applied by: {{ leave.employeeId.firstName }} {{ leave.employeeId.lastName }} ({{ leave.employeeId.email }})
        </p>
      </div>
      <StatusBadge :status="leave.status" />
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
      <div>
        <span class="block text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">Start Date</span>
        {{ formatDate(leave.startDate) }}
      </div>
      <div>
        <span class="block text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">End Date</span>
        {{ formatDate(leave.endDate) }}
      </div>
    </div>

    <div class="mb-4">
      <span class="block text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">Reason</span>
      <p class="text-gray-800 text-sm bg-gray-50 p-3 rounded border border-gray-100">{{ leave.reason }}</p>
    </div>

    <div v-if="isEmployer && leave.status === 'Pending'" class="flex space-x-3 mt-4 pt-4 border-t border-gray-100">
      <button 
        @click="handleAction('Approved')"
        class="flex-1 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 font-semibold py-2 px-4 rounded transition-colors text-sm">
        Approve
      </button>
      <button 
        @click="handleAction('Rejected')"
        class="flex-1 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 font-semibold py-2 px-4 rounded transition-colors text-sm">
        Reject
      </button>
    </div>
  </div>
</template>
