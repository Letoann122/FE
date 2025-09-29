import { ref, computed } from 'vue'

export function useRoleManagement() {
  // Reactive data
  const searchQuery = ref('')
  const selectedStatus = ref('')
  const selectedCategory = ref('')
  const showAddRoleModal = ref(false)
  const showEditRoleModal = ref(false)
  const showAssignUsersModal = ref(false)
  const editingRole = ref(null)
  const assigningRole = ref(null)

  const newRole = ref({
    name: '',
    description: '',
    category: '',
    icon: 'bi bi-person-heart',
    permissions: [],
    status: 'Active'
  })

  const editRoleData = ref({
    name: '',
    description: '',
    category: '',
    icon: '',
    permissions: [],
    status: ''
  })

  // Available permissions for user management system
  const availablePermissions = ref([
    { id: 1, name: 'Quản lý người dùng', icon: 'bi bi-people' },
    { id: 2, name: 'Xem thông tin người dùng', icon: 'bi bi-eye' },
    { id: 3, name: 'Thêm/xóa người dùng', icon: 'bi bi-person-plus' },
    { id: 4, name: 'Chỉnh sửa người dùng', icon: 'bi bi-pencil' },
    { id: 5, name: 'Xem báo cáo thống kê', icon: 'bi bi-graph-up' },
    { id: 6, name: 'Quản lý vai trò', icon: 'bi bi-shield-check' },
    { id: 7, name: 'Quản lý hệ thống', icon: 'bi bi-gear' },
    { id: 8, name: 'Quản lý nội dung', icon: 'bi bi-newspaper' },
    { id: 9, name: 'Phân quyền người dùng', icon: 'bi bi-key' },
    { id: 10, name: 'Xuất báo cáo', icon: 'bi bi-file-earmark-text' },
    { id: 11, name: 'Gửi thông báo', icon: 'bi bi-bell' },
    { id: 12, name: 'Xem log hoạt động', icon: 'bi bi-list-check' }
  ])

  // Sample roles data
  const roles = ref([
    {
      id: 1,
      name: 'Admin',
      description: 'Quản trị viên hệ thống với quyền truy cập đầy đủ, quản lý tất cả người dùng và cài đặt hệ thống',
      category: 'Administrative',
      icon: 'bi bi-shield-check',
      status: 'Active',
      permissions: ['Quản lý người dùng', 'Xem thông tin người dùng', 'Thêm/xóa người dùng', 'Chỉnh sửa người dùng', 'Quản lý vai trò', 'Quản lý hệ thống', 'Phân quyền người dùng', 'Xuất báo cáo', 'Xem log hoạt động'],
      userCount: 2,
      createdDate: '01/01/2024'
    },
    {
      id: 2,
      name: 'Moderator',
      description: 'Người kiểm duyệt có quyền quản lý người dùng và nội dung, nhưng không thể thay đổi cài đặt hệ thống',
      category: 'Moderation',
      icon: 'bi bi-person-check',
      status: 'Active',
      permissions: ['Xem thông tin người dùng', 'Chỉnh sửa người dùng', 'Quản lý nội dung', 'Gửi thông báo', 'Xem báo cáo thống kê'],
      userCount: 5,
      createdDate: '05/01/2024'
    },
    {
      id: 3,
      name: 'User',
      description: 'Người dùng thông thường có quyền xem thông tin cá nhân và sử dụng các tính năng cơ bản',
      category: 'Standard',
      icon: 'bi bi-person',
      status: 'Active',
      permissions: ['Xem thông tin người dùng', 'Gửi thông báo'],
      userCount: 150,
      createdDate: '10/01/2024'
    },
    {
      id: 4,
      name: 'Guest',
      description: 'Khách truy cập với quyền hạn hạn chế, chỉ có thể xem thông tin công khai',
      category: 'Guest',
      icon: 'bi bi-person-dash',
      status: 'Active',
      permissions: ['Xem thông tin người dùng'],
      userCount: 500,
      createdDate: '15/01/2024'
    }
  ])

  // Sample users data
  const users = ref([
    { id: 1, name: 'Nguyễn Văn Admin', email: 'admin@system.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face', currentRole: 'Admin' },
    { id: 2, name: 'Trần Thị Moderator', email: 'mod@system.com', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=32&h=32&fit=crop&crop=face', currentRole: 'Moderator' },
    { id: 3, name: 'Lê Văn User', email: 'user@system.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face', currentRole: 'User' },
    { id: 4, name: 'Phạm Thị Guest', email: 'guest@system.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face', currentRole: 'Guest' },
    { id: 5, name: 'Hoàng Văn User2', email: 'user2@system.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face', currentRole: 'User' }
  ])

  // Computed properties
  const filteredRoles = computed(() => {
    let filtered = roles.value

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(role => 
        role.name.toLowerCase().includes(query) ||
        role.description.toLowerCase().includes(query) ||
        role.category.toLowerCase().includes(query)
      )
    }

    if (selectedStatus.value) {
      filtered = filtered.filter(role => role.status === selectedStatus.value)
    }

    if (selectedCategory.value) {
      filtered = filtered.filter(role => role.category === selectedCategory.value)
    }

    return filtered
  })

  const availableUsers = computed(() => {
    if (!assigningRole.value) return users.value
    return users.value.filter(user => user.currentRole !== assigningRole.value.name)
  })

  const roleUsers = computed(() => {
    if (!assigningRole.value) return []
    return users.value.filter(user => user.currentRole === assigningRole.value.name)
  })

  // Methods
  const statusClassName = (status) => {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Inactive':
        return 'status-inactive';
      default:
        return 'status-inactive';
    }
  }

  const editRole = (role) => {
    editingRole.value = role
    editRoleData.value = {
      name: role.name,
      description: role.description,
      category: role.category,
      icon: role.icon,
      permissions: [...role.permissions],
      status: role.status
    }
    showEditRoleModal.value = true
  }

  const updateRole = () => {
    const roleIndex = roles.value.findIndex(role => role.id === editingRole.value.id)
    if (roleIndex !== -1) {
      roles.value[roleIndex] = {
        ...roles.value[roleIndex],
        name: editRoleData.value.name,
        description: editRoleData.value.description,
        category: editRoleData.value.category,
        icon: editRoleData.value.icon,
        permissions: editRoleData.value.permissions,
        status: editRoleData.value.status
      }
    }
    
    showEditRoleModal.value = false
    editingRole.value = null
    
    // Reset form
    editRoleData.value = {
      name: '',
      description: '',
      category: '',
      icon: '',
      permissions: [],
      status: ''
    }
  }

  const addRole = () => {
    const role = {
      id: Date.now(),
      name: newRole.value.name,
      description: newRole.value.description,
      category: newRole.value.category,
      icon: newRole.value.icon,
      status: newRole.value.status,
      permissions: newRole.value.permissions,
      userCount: 0,
      createdDate: new Date().toLocaleDateString('vi-VN')
    }
    
    roles.value.push(role)
    showAddRoleModal.value = false
    
    // Reset form
    newRole.value = {
      name: '',
      description: '',
      category: '',
      icon: 'bi bi-person-heart',
      permissions: [],
      status: 'Active'
    }
  }

  const deleteRole = (roleId) => {
    if (confirm('Bạn có chắc chắn muốn xóa vai trò này?')) {
      roles.value = roles.value.filter(role => role.id !== roleId)
      alert('Vai trò đã được xóa thành công!')
    }
  }

  const assignUsers = (role) => {
    assigningRole.value = role
    showAssignUsersModal.value = true
  }

  const assignUserToRole = (user) => {
    user.currentRole = assigningRole.value.name
    // Update user count for the role
    const roleIndex = roles.value.findIndex(role => role.id === assigningRole.value.id)
    if (roleIndex !== -1) {
      roles.value[roleIndex].userCount++
    }
  }

  const removeUserFromRole = (user) => {
    user.currentRole = null
    // Update user count for the role
    const roleIndex = roles.value.findIndex(role => role.id === assigningRole.value.id)
    if (roleIndex !== -1) {
      roles.value[roleIndex].userCount--
    }
  }

  return {
    // Reactive data
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
    
    // Computed
    filteredRoles,
    availableUsers,
    roleUsers,
    
    // Methods
    statusClassName,
    editRole,
    updateRole,
    addRole,
    deleteRole,
    assignUsers,
    assignUserToRole,
    removeUserFromRole
  }
}
