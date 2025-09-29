<template>
  <div class="rm min-vh-100 bg-white p-4">
    <div class="bg-white rounded shadow-sm">
      <RoleHeader />

      <RoleControls 
        v-model:search-query="searchQuery"
        v-model:selected-status="selectedStatus"
        v-model:selected-category="selectedCategory"
        @add-role="showAddRoleModal = true"
      />

      <RoleCards 
        :filtered-roles="filteredRoles"
        @edit-role="editRole"
        @assign-users="assignUsers"
        @delete-role="deleteRole"
      />
    </div>

    <AddRoleModal 
      :show="showAddRoleModal"
      :role-data="newRole"
      :available-permissions="availablePermissions"
      @close="showAddRoleModal = false"
      @add-role="addRole"
    />

    <EditRoleModal 
      :show="showEditRoleModal"
      :role-data="editRoleData"
      :available-permissions="availablePermissions"
      @close="showEditRoleModal = false"
      @update-role="updateRole"
    />

    <AssignUsersModal 
      :show="showAssignUsersModal"
      :role="assigningRole"
      :available-users="availableUsers"
      :role-users="roleUsers"
      @close="showAssignUsersModal = false"
      @assign-user="assignUserToRole"
      @remove-user="removeUserFromRole"
    />
  </div>
</template>

<script setup>
import { useRoleManagement } from './RoleManagement/composables/useRoleManagement.js'
import RoleHeader from './RoleManagement/components/header.vue'
import RoleControls from './RoleManagement/components/controls.vue'
import RoleCards from './RoleManagement/components/cards.vue'
import AddRoleModal from './RoleManagement/components/add.vue'
import EditRoleModal from './RoleManagement/components/edit.vue'
import AssignUsersModal from './RoleManagement/components/assign.vue'

const {
  searchQuery,
  selectedStatus,
  selectedCategory,
  showAddRoleModal,
  showEditRoleModal,
  showAssignUsersModal,
  editingRole,
  assigningRole,
  newRole,
  editRoleData,
  availablePermissions,
  roles,
  users,
  
  filteredRoles,
  availableUsers,
  roleUsers,
  
  statusClassName,
  editRole,
  updateRole,
  addRole,
  deleteRole,
  assignUsers,
  assignUserToRole,
  removeUserFromRole
} = useRoleManagement()
</script>

<style scoped>
@import './RoleManagement/styles/role-management.css';
</style>
