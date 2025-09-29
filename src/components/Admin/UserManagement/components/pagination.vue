<template>
  <div class="p-4 border-top bg-white d-flex align-items-center justify-content-between">
    <div class="d-flex align-items-center gap-2">
      <span class="small text-muted">Số dòng mỗi trang</span>
      <select :value="rowsPerPage" @change="$emit('update:rows-per-page', parseInt($event.target.value))" class="form-select form-select-sm" style="width: auto;">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <span class="small text-muted">trong {{ totalUsers }} dòng</span>
    </div>

    <div class="d-flex align-items-center gap-1">
      <button @click="$emit('go-to-page', 1)" :disabled="currentPage === 1"
        class="btn btn-sm btn-outline-secondary" :class="{ 'disabled': currentPage === 1 }">«</button>
      <button @click="$emit('go-to-page', currentPage - 1)" :disabled="currentPage === 1"
        class="btn btn-sm btn-outline-secondary" :class="{ 'disabled': currentPage === 1 }">‹</button>
      <button v-for="page in visiblePages" :key="page" @click="$emit('go-to-page', page)"
        :class="page === currentPage ? 'btn-primary' : 'btn-outline-secondary'"
        class="btn btn-sm">{{ page }}</button>
      <button @click="$emit('go-to-page', currentPage + 1)" :disabled="currentPage === totalPages"
        class="btn btn-sm btn-outline-secondary" :class="{ 'disabled': currentPage === totalPages }">›</button>
      <button @click="$emit('go-to-page', totalPages)" :disabled="currentPage === totalPages"
        class="btn btn-sm btn-outline-secondary" :class="{ 'disabled': currentPage === totalPages }">»</button>
    </div>
  </div>
</template>

<script setup>
// nhận dữ liệu từ component cha
defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  totalUsers: {
    type: Number,
    required: true
  },
  rowsPerPage: {
    type: Number,
    required: true
  },
  visiblePages: {
    type: Array,
    required: true
  }
})

// các sự kiện có thể emit
defineEmits(['go-to-page', 'update:rows-per-page'])
</script>
