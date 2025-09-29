<template>
  <div class="table-responsive">
    <table class="table table-hover mb-0">
      <thead class="table-light">
        <tr>
          <th class="px-3 py-3 text-start small fw-semibold text-muted text-uppercase">
            <input type="checkbox" :checked="selectAll" @change="$emit('update:select-all', $event.target.checked)" class="form-check-input custom-checkbox">
          </th>
          <th class="px-3 py-3 text-start small fw-semibold text-muted text-uppercase">Tên</th>
          <th class="px-3 py-3 text-start small fw-semibold text-muted text-uppercase">Email</th>
          <th class="px-3 py-3 text-start small fw-semibold text-muted text-uppercase">Username</th>
          <th class="px-3 py-3 text-start small fw-semibold text-muted text-uppercase">Trạng thái</th>
          <th class="px-3 py-3 text-start small fw-semibold text-muted text-uppercase">Vai trò</th>
          <th class="px-3 py-3 text-start small fw-semibold text-muted text-uppercase">Ngày tham gia</th>
          <th class="px-3 py-3 text-start small fw-semibold text-muted text-uppercase">Hoạt động cuối</th>
          <th class="px-3 py-3 text-start small fw-semibold text-muted text-uppercase">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td class="px-3 py-3">
            <input type="checkbox" :checked="selectedUsers.includes(user.id)" @change="toggleUserSelection(user.id, $event.target.checked)" class="form-check-input custom-checkbox">
          </td>
          <td class="px-3 py-3">
            <div class="d-flex align-items-center">
              <img :src="user.avatar" :alt="user.name" class="avatar rounded-circle me-3">
              <span class="small fw-medium text-dark">{{ user.name }}</span>
            </div>
          </td>
          <td class="px-3 py-3 small text-dark">{{ user.email }}</td>
          <td class="px-3 py-3 small text-dark">{{ user.username }}</td>
          <td class="px-3 py-3">
            <span class="status-badge" :class="statusClassName(user.status)">
              {{ user.status }}
            </span>
          </td>
          <td class="px-3 py-3 small text-dark">{{ user.role }}</td>
          <td class="px-3 py-3 small text-dark">{{ user.joinedDate }}</td>
          <td class="px-3 py-3 small text-dark">{{ user.lastActive }}</td>
          <td class="px-3 py-3 small fw-medium">
            <div class="d-flex align-items-center gap-2">
              <!-- Edit -->
              <button @click="$emit('edit-user', user)" class="btn btn-sm btn-outline-primary btn-icon">
                <i class="bi bi-pencil"></i>
              </button>
              <!-- Delete -->
              <button @click="$emit('delete-user', user.id)" class="btn btn-sm btn-outline-danger btn-icon">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// nhận dữ liệu từ component cha
const props = defineProps({
  filteredUsers: {
    type: Array,
    required: true
  },
  selectAll: {
    type: Boolean,
    default: false
  },
  selectedUsers: {
    type: Array,
    required: true
  }
})

// các sự kiện có thể emit
const emit = defineEmits(['toggle-select-all', 'edit-user', 'delete-user', 'update:select-all', 'update:selected-users'])

// xử lý chọn/bỏ chọn user
const toggleUserSelection = (userId, isSelected) => {
  let currentSelected = []
  // copy danh sách hiện tại
  for (let i = 0; i < props.selectedUsers.length; i++) {
    currentSelected.push(props.selectedUsers[i])
  }
  
  if (isSelected) {
    // thêm user vào danh sách chọn
    let found = false
    for (let i = 0; i < currentSelected.length; i++) {
      if (currentSelected[i] === userId) {
        found = true
        break
      }
    }
    if (!found) {
      currentSelected.push(userId)
    }
  } else {
    // xóa user khỏi danh sách chọn
    let newSelected = []
    for (let i = 0; i < currentSelected.length; i++) {
      if (currentSelected[i] !== userId) {
        newSelected.push(currentSelected[i])
      }
    }
    currentSelected = newSelected
  }
  emit('update:selected-users', currentSelected)
}

// trả về class cho status
const statusClassName = (status) => {
  if (status === 'Active') {
    return 'status-active'
  } else if (status === 'Inactive') {
    return 'status-inactive'
  } else if (status === 'Banned') {
    return 'status-banned'
  } else if (status === 'Pending') {
    return 'status-pending'
  } else if (status === 'Suspended') {
    return 'status-suspended'
  } else {
    return 'status-inactive'
  }
}
</script>

<style scoped>
/* Custom checkbox styles */
.custom-checkbox {
  appearance: none !important;
  -webkit-appearance: none !important;
  width: 18px !important;
  height: 18px !important;
  border: 2px solid #cbd5e1 !important;
  border-radius: 4px !important;
  background-color: #ffffff !important;
  cursor: pointer !important;
  position: relative !important;
  transition: all 0.2s ease !important;
  margin: 0 !important;
  padding: 0 !important;
}

.custom-checkbox:checked {
  background-color: #2563eb !important;
  border-color: #2563eb !important;
}

.custom-checkbox:checked::after {
  content: '✓' !important;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  color: white !important;
  font-size: 12px !important;
  font-weight: bold !important;
  line-height: 1 !important;
}
</style>
