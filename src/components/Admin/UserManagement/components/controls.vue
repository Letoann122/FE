<template>
  <div class="p-4 border-bottom bg-white">
    <div class="d-flex flex-wrap gap-3 align-items-center justify-content-between">
      <div class="d-flex flex-wrap gap-3 align-items-center">
        <!-- Tìm kiếm -->
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
            placeholder="Tìm kiếm..."
            class="form-control ps-5"
            style="width: 250px;"
          />
        </div>

        <!-- Lọc theo vai trò -->
        <select :value="selectedRole" @change="$emit('update:selected-role', $event.target.value)" class="form-select" style="width: auto;">
          <option value="">Vai trò</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Guest">Guest</option>
          <option value="Moderator">Moderator</option>
        </select>

        <!-- Lọc theo trạng thái -->
        <select :value="selectedStatus" @change="$emit('update:selected-status', $event.target.value)" class="form-select" style="width: auto;">
          <option value="">Trạng thái</option>
          <option value="Active">Hoạt động</option>
          <option value="Inactive">Không hoạt động</option>
          <option value="Banned">Bị cấm</option>
          <option value="Pending">Chờ duyệt</option>
          <option value="Suspended">Tạm khóa</option>
        </select>

        <!-- Lọc theo ngày -->
        <select :value="selectedDate" @change="$emit('update:selected-date', $event.target.value)" class="form-select" style="width: auto;">
          <option value="">Ngày</option>
          <option value="today">Hôm nay</option>
          <option value="week">Tuần này</option>
          <option value="month">Tháng này</option>
          <option value="year">Năm nay</option>
        </select>
      </div>

      <!-- Các nút thao tác -->
      <div class="d-flex gap-3">
        <button v-if="selectedUsers.length > 0" @click="$emit('delete-selected')" class="btn btn-outline-danger bright">
          <i class="bi bi-trash me-2"></i>
          Xóa đã chọn ({{ selectedUsers.length }})
        </button>

        <button @click="$emit('add-user')" class="btn btn-primary bright">
          <i class="bi bi-plus-circle me-2"></i>
          Thêm user
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// nhận dữ liệu từ component cha
defineProps({
  searchQuery: String,
  selectedRole: String,
  selectedStatus: String,
  selectedDate: String,
  selectedUsers: Array
})

// các sự kiện có thể emit
defineEmits(['add-user', 'delete-selected', 'update:search-query', 'update:selected-role', 'update:selected-status', 'update:selected-date'])
</script>
