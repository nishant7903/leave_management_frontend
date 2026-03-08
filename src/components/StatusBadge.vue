<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true
  }
})

const badgeClass = computed(() => {
  switch (props.status?.toLowerCase()) {
    case 'approved':
      return 'bg-green-100 text-green-800 border bg-green-200'
    case 'rejected':
      return 'bg-red-100 text-red-800 border bg-red-200'
    case 'pending':
    default:
      return 'bg-yellow-100 text-yellow-800 border bg-yellow-200'
  }
})
</script>

<template>
  <span 
    :class="['px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize', badgeClass]">
    {{ status }}
  </span>
</template>
