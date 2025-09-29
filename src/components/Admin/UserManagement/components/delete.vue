<template>
  <div v-if="show" class="modal show d-block" style="background-color: rgba(0,0,0,0.5);" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title text-danger">
            <i class="bi bi-exclamation-triangle me-2"></i>
            Confirm Delete
          </h5>
          <button type="button" class="btn-close" @click="$emit('cancel')"></button>
        </div>
        <div class="modal-body">
          <div class="text-center mb-3">
            <i class="bi bi-person-x text-danger" style="font-size: 3rem;"></i>
          </div>
          <p class="text-center mb-3">
            Are you sure you want to delete this user?
          </p>
          <div class="bg-light p-3 rounded">
            <div class="d-flex align-items-center">
              <img :src="user?.avatar" :alt="user?.name" class="avatar rounded-circle me-3" style="width: 40px; height: 40px;">
              <div>
                <h6 class="mb-1">{{ user?.name }}</h6>
                <small class="text-muted">{{ user?.email }}</small>
              </div>
            </div>
          </div>
          <div class="alert alert-warning mt-3" role="alert">
            <i class="bi bi-exclamation-triangle me-2"></i>
            <strong>Warning:</strong> This action cannot be undone.
          </div>
        </div>
        <div class="modal-footer border-0">
          <button type="button" @click="$emit('cancel')" class="btn btn-secondary">Cancel</button>
          <button type="button" @click="$emit('confirm')" class="btn btn-danger">
            <i class="bi bi-trash me-2"></i>
            Delete User
          </button>
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
  user: {
    type: Object,
    default: null
  }
})

defineEmits(['cancel', 'confirm'])
</script>
