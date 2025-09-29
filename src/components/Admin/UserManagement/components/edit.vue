<template>
  <div v-if="show" class="modal show d-block" style="background-color: rgba(0,0,0,0.5);" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit User</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <form @submit.prevent="$emit('update-user')">
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Full Name</label>
              <input v-model="userData.name" type="text" required class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model="userData.email" type="email" required class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label">Username</label>
              <input v-model="userData.username" type="text" required class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label">Role</label>
              <select v-model="userData.role" required class="form-select">
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Guest">Guest</option>
                <option value="Moderator">Moderator</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Status</label>
              <select v-model="userData.status" required class="form-select">
                <option value="">Select Status</option>
                <option value="Active">Hoạt động</option>
                <option value="Inactive">Không hoạt động</option>
                <option value="Banned">Bị cấm</option>
                <option value="Pending">Chờ duyệt</option>
                <option value="Suspended">Tạm khóa</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click="$emit('close')" class="btn btn-secondary">Cancel</button>
            <button type="submit" class="btn btn-primary">Update User</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  userData: {
    type: Object,
    required: true
  }
})

defineEmits(['close', 'update-user'])
</script>
