<template>
  <div v-if="show" class="modal show d-block" style="background-color: rgba(0,0,0,0.5);" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add New User</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <form @submit.prevent="$emit('add-user')">
          <div class="modal-body">
            <div class="mb-3">
              <input v-model="userData.name" type="text" placeholder="Full Name" required
                class="form-control">
            </div>
            <div class="mb-3">
              <input v-model="userData.email" type="email" placeholder="Email" required
                class="form-control">
            </div>
            <div class="mb-3">
              <input v-model="userData.username" type="text" placeholder="Username" required
                class="form-control">
            </div>
            <div class="mb-3">
              <select v-model="userData.role" required class="form-select">
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Guest">Guest</option>
                <option value="Moderator">Moderator</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click="$emit('close')" class="btn btn-secondary">Cancel</button>
            <button type="submit" class="btn btn-primary">Add User</button>
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

defineEmits(['close', 'add-user'])
</script>
