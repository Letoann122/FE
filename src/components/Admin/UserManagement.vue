<template>
  <div class="um min-vh-100 bg-white p-4">
    <div class="bg-white rounded shadow-sm">
      <!-- Header -->
      <UserHeader />

      <!-- Controls -->
      <UserControls 
        v-model:search-query="searchQuery"
        v-model:selected-role="selectedRole"
        v-model:selected-status="selectedStatus"
        v-model:selected-date="selectedDate"
        :selected-users="selectedUsers"
        @add-user="showAddUserModal = true"
        @delete-selected="deleteSelectedUsers"
      />
  
      <!-- Table -->
      <UserTable 
        :filtered-users="filteredUsers"
        v-model:select-all="selectAll"
        v-model:selected-users="selectedUsers"
        @toggle-select-all="toggleSelectAll"
        @edit-user="editUser"
        @delete-user="deleteUser"
      />

      <!-- Pagination -->
      <UserPagination 
        :current-page="currentPage"
        :total-pages="totalPages"
        :total-users="totalUsers"
        v-model:rows-per-page="rowsPerPage"
        :visible-pages="visiblePages"
        @go-to-page="goToPage"
      />
            </div>

    <!-- Add User Modal -->
    <AddUserModal 
      :show="showAddUserModal"
      :user-data="newUser"
      @close="showAddUserModal = false"
      @add-user="addUser"
    />

    <!-- Edit User Modal -->
    <EditUserModal 
      :show="showEditUserModal"
      :user-data="editUserData"
      @close="showEditUserModal = false"
      @update-user="updateUser"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteUserModal 
      :show="showDeleteModal"
      :user="deletingUser"
      @cancel="cancelDelete"
      @confirm="confirmDelete"
    />
  </div>
</template>
  
  <script setup>
import { useUserManagement } from './UserManagement/composables/useUserManagement.js'
import UserHeader from './UserManagement/components/header.vue'
import UserControls from './UserManagement/components/controls.vue'
import UserTable from './UserManagement/components/table.vue'
import UserPagination from './UserManagement/components/pagination.vue'
import AddUserModal from './UserManagement/components/add.vue'
import EditUserModal from './UserManagement/components/edit.vue'
import DeleteUserModal from './UserManagement/components/delete.vue'

// Use the composable
const {
// Reactive data
  searchQuery,
  selectedRole,
  selectedStatus,
  selectedDate,
  selectAll,
  selectedUsers,
  currentPage,
  rowsPerPage,
  showAddUserModal,
  showEditUserModal,
  showDeleteModal,
  editingUser,
  deletingUser,
  newUser,
  editUserData,
  users,
  
  // Computed
  filteredUsers,
  totalUsers,
  totalPages,
  visiblePages,

// Methods
  statusClassName,
  toggleSelectAll,
  goToPage,
  editUser,
  deleteUser,
  confirmDelete,
  cancelDelete,
  deleteSelectedUsers,
  addUser,
  updateUser
} = useUserManagement()
  </script>
<style scoped>
@import './UserManagement/styles/user-management.css';
</style>