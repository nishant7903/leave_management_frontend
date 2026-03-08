<script setup>
import { onMounted, computed, ref } from 'vue'
import { useLeavesStore } from '../../stores/leaves'
import LeaveCard from '../../components/LeaveCard.vue'

const leavesStore = useLeavesStore()
const filterStatus = ref('All')

onMounted(async () => {
  await leavesStore.fetchLeaves()
})

const loading = computed(() => leavesStore.loading)
const allLeaves = computed(() => leavesStore.leaves)

const filteredLeaves = computed(() => {
  if (filterStatus.value === 'All') {
    return allLeaves.value
  }
  return allLeaves.value.filter(leave => leave.status === filterStatus.value)
})

const handleUpdateStatus = async (id, status) => {
  await leavesStore.updateLeaveStatus(id, status)
}
</script>

<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">All Employee Requests</h2>
      
      <!-- Filter -->
      <div class="flex space-x-2 bg-white rounded-lg shadow-sm p-1 border border-gray-200">
        <button 
          @click="filterStatus = 'All'"
          :class="[
            'px-4 py-1.5 text-sm font-medium rounded-md transition-colors',
            filterStatus === 'All' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700'
          ]">
          All
        </button>
        <button 
          @click="filterStatus = 'Pending'"
          :class="[
            'px-4 py-1.5 text-sm font-medium rounded-md transition-colors',
            filterStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'text-gray-500 hover:text-gray-700'
          ]">
          Pending
        </button>
        <button 
          @click="filterStatus = 'Approved'"
          :class="[
            'px-4 py-1.5 text-sm font-medium rounded-md transition-colors',
            filterStatus === 'Approved' ? 'bg-green-100 text-green-800' : 'text-gray-500 hover:text-gray-700'
          ]">
          Approved
        </button>
        <button 
          @click="filterStatus = 'Rejected'"
          :class="[
            'px-4 py-1.5 text-sm font-medium rounded-md transition-colors',
            filterStatus === 'Rejected' ? 'bg-red-100 text-red-800' : 'text-gray-500 hover:text-gray-700'
          ]">
          Rejected
        </button>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-pulse flex flex-col items-center">
        <div class="rounded-full bg-gray-200 h-12 w-12 mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-24"></div>
      </div>
    </div>

    <div v-else-if="filteredLeaves.length === 0" class="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No requests found</h3>
      <p class="mt-1 text-sm text-gray-500">There are no {{ filterStatus !== 'All' ? filterStatus.toLowerCase() : '' }} leave requests at the moment.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <LeaveCard 
        v-for="leave in filteredLeaves" 
        :key="leave._id" 
        :leave="leave"
        :isEmployer="true"
        @update-status="handleUpdateStatus"
      />
    </div>
  </div>
</template>
