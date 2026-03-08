<script setup>
import { onMounted, computed } from 'vue'
import { useLeavesStore } from '../../stores/leaves'
import LeaveCard from '../../components/LeaveCard.vue'

const leavesStore = useLeavesStore()

onMounted(async () => {
  await leavesStore.fetchLeaves()
})

const leaves = computed(() => leavesStore.leaves)
const loading = computed(() => leavesStore.loading)
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-800">Your Leave History</h2>
      <router-link 
        to="/apply-leave" 
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors shadow-sm">
        New Leave Request
      </router-link>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-pulse flex flex-col items-center">
        <div class="rounded-full bg-gray-200 h-12 w-12 mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-24"></div>
      </div>
    </div>

    <div v-else-if="leaves.length === 0" class="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No leaves requests</h3>
      <p class="mt-1 text-sm text-gray-500">Get started by creating a new leave request.</p>
      <div class="mt-6">
        <router-link to="/apply-leave" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <svg class="-ml-1 mr-2 h-5 w-5" x-description="Heroicon name: solid/plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          New Request
        </router-link>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <LeaveCard 
        v-for="leave in leaves" 
        :key="leave._id" 
        :leave="leave" 
        :isEmployer="false" 
      />
    </div>
  </div>
</template>
