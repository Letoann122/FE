<template>
  <div v-if="show" class="modal show d-block" style="background-color: rgba(0,0,0,0.5);" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <i class="bi bi-person-plus me-2 text-success"></i>
            Gán người dùng cho vai trò: {{ role?.name }}
          </h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6">
              <h6 class="fw-semibold mb-3">Người dùng có sẵn</h6>
              <div class="user-list" style="max-height: 300px; overflow-y: auto;">
                <div v-for="user in availableUsers" :key="user.id" 
                     class="d-flex align-items-center p-2 border rounded mb-2">
                  <img :src="user.avatar" :alt="user.name" class="avatar rounded-circle me-3" style="width: 32px; height: 32px;">
                  <div class="flex-grow-1">
                    <div class="fw-medium">{{ user.name }}</div>
                    <small class="text-muted">{{ user.email }}</small>
                  </div>
                  <button @click="$emit('assign-user', user)" class="btn btn-sm btn-outline-primary">
                    <i class="bi bi-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <h6 class="fw-semibold mb-3">Người dùng trong vai trò</h6>
              <div class="user-list" style="max-height: 300px; overflow-y: auto;">
                <div v-for="user in roleUsers" :key="user.id" 
                     class="d-flex align-items-center p-2 border rounded mb-2">
                  <img :src="user.avatar" :alt="user.name" class="avatar rounded-circle me-3" style="width: 32px; height: 32px;">
                  <div class="flex-grow-1">
                    <div class="fw-medium">{{ user.name }}</div>
                    <small class="text-muted">{{ user.email }}</small>
                  </div>
                  <button @click="$emit('remove-user', user)" class="btn btn-sm btn-outline-danger">
                    <i class="bi bi-x"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" @click="$emit('close')" class="btn btn-secondary">Đóng</button>
        </div>
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
  role: {
    type: Object,
    default: null
  },
  availableUsers: {
    type: Array,
    required: true
  },
  roleUsers: {
    type: Array,
    required: true
  }
})

defineEmits(['close', 'assign-user', 'remove-user'])
</script>
