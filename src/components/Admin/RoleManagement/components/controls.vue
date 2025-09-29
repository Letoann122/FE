<template>
  <div class="p-4 border-bottom bg-white">
    <div class="d-flex flex-wrap gap-3 align-items-center justify-content-between">
      <div class="d-flex flex-wrap gap-3 align-items-center">
        <!-- Search -->
        <div class="position-relative">
          <svg
            class="search-icon position-absolute top-50 translate-middle-y start-0 ms-3 text-muted"
            style="width: 16px; height: 16px; z-index: 10;"
            fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            :value="searchQuery"
            @input="$emit('update:search-query', $event.target.value)"
            type="text"
            placeholder="Tìm kiếm vai trò..."
            class="form-control ps-5"
            style="width: 250px;"
          />
        </div>

        <select :value="selectedStatus" @change="$emit('update:selected-status', $event.target.value)" class="form-select" style="width: auto;">
          <option value="">Trạng thái</option>
          <option value="Active">Hoạt động</option>
          <option value="Inactive">Không hoạt động</option>
        </select>

        <!-- Category Filter -->
        <select :value="selectedCategory" @change="$emit('update:selected-category', $event.target.value)" class="form-select" style="width: auto;">
          <option value="">Danh mục</option>
          <option value="Administrative">Admin</option>
          <option value="Moderation">Moderator</option>
          <option value="Standard">User</option>
          <option value="Guest">Guest</option>
        </select>
      </div>

      <div class="d-flex gap-3">
        <button @click="$emit('add-role')" class="btn btn-primary bright">
          <i class="bi bi-plus-circle me-2"></i>
          Thêm vai trò
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  searchQuery: String,
  selectedStatus: String,
  selectedCategory: String
})

defineEmits(['add-role', 'update:search-query', 'update:selected-status', 'update:selected-category'])
</script>
