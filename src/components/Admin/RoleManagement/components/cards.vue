<template>
  <div class="p-4">
    <div class="row g-4">
      <div v-for="role in filteredRoles" :key="role.id" class="col-lg-4 col-md-6">
        <RoleCard 
          :role="role" 
          @edit-role="$emit('edit-role', $event)"
          @assign-users="$emit('assign-users', $event)"
          @delete-role="$emit('delete-role', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import RoleCard from './card.vue'

defineProps({
  filteredRoles: {
    type: Array,
    required: true
  }
})

defineEmits(['edit-role', 'assign-users', 'delete-role'])
</script>
