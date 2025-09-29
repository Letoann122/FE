import { ref, computed } from 'vue'

// hàm quản lý user
export function useUserManagement() {
  // các biến để lưu dữ liệu
  const searchQuery = ref('')
  const selectedRole = ref('')
  const selectedStatus = ref('')
  const selectedDate = ref('')
  const selectAll = ref(false)
  const selectedUsers = ref([])
  const currentPage = ref(1)
  const rowsPerPage = ref(10)
  
  // các biến để hiển thị modal
  const showAddUserModal = ref(false)
  const showEditUserModal = ref(false)
  const showDeleteModal = ref(false)
  const editingUser = ref(null)
  const deletingUser = ref(null)

  // object để thêm user mới
  const newUser = ref({
    name: '',
    email: '',
    username: '',
    role: ''
  })

  // object để edit user
  const editUserData = ref({
    name: '',
    email: '',
    username: '',
    role: '',
    status: ''
  })

  // dữ liệu user mẫu
  const users = ref([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@gmail.com',
      username: 'jonny77',
      status: 'Active',
      role: 'Admin',
      joinedDate: 'March 12, 2023',
      lastActive: '1 minute ago',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Olivia Bennett',
      email: 'olivia.bennett@gmail.com',
      username: 'oliviaB',
      status: 'Inactive',
      role: 'User',
      joinedDate: 'June 27, 2022',
      lastActive: '1 month ago',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=32&h=32&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Daniel Warren',
      email: 'dwarren3@gmail.com',
      username: 'dwarren3',
      status: 'Banned',
      role: 'User',
      joinedDate: 'January 8, 2024',
      lastActive: '4 days ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Chloe Hayes',
      email: 'chloehiye@gmail.com',
      username: 'chloehh',
      status: 'Pending',
      role: 'Guest',
      joinedDate: 'October 5, 2021',
      lastActive: '10 days ago',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'Marcus Reed',
      email: 'reeds777@gmail.com',
      username: 'reeds7',
      status: 'Suspended',
      role: 'User',
      joinedDate: 'February 19, 2023',
      lastActive: '3 months ago',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
    },
    {
      id: 6,
      name: 'Isabelle Clark',
      email: 'belleclark@gmail.com',
      username: 'bellecl',
      status: 'Active',
      role: 'Moderator',
      joinedDate: 'August 30, 2022',
      lastActive: '1 week ago',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face'
    },
    {
      id: 7,
      name: 'Lucas Mitchell',
      email: 'lucamitch@gmail.com',
      username: 'lucamich',
      status: 'Active',
      role: 'Guest',
      joinedDate: 'April 23, 2024',
      lastActive: '4 hours ago',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face'
    },
    {
      id: 8,
      name: 'Mark Wilburg',
      email: 'markwill32@gmail.com',
      username: 'markwill32',
      status: 'Banned',
      role: 'User',
      joinedDate: 'November 14, 2020',
      lastActive: '2 months ago',
      avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=32&h=32&fit=crop&crop=face'
    }
  ])

  // tính toán danh sách user đã lọc
  const filteredUsers = computed(() => {
    let result = users.value

    // tìm kiếm theo tên, email, username
    if (searchQuery.value) {
      const search = searchQuery.value.toLowerCase()
      result = result.filter(user => {
        return user.name.toLowerCase().includes(search) ||
               user.email.toLowerCase().includes(search) ||
               user.username.toLowerCase().includes(search)
      })
    }

    // lọc theo role
    if (selectedRole.value) {
      result = result.filter(user => user.role === selectedRole.value)
    }

    // lọc theo status
    if (selectedStatus.value) {
      result = result.filter(user => user.status === selectedStatus.value)
    }

    // phân trang
    const start = (currentPage.value - 1) * rowsPerPage.value
    const end = start + rowsPerPage.value
    return result.slice(start, end)
  })

  // tổng số user
  const totalUsers = computed(() => users.value.length)
  
  // tổng số trang
  const totalPages = computed(() => {
    return Math.ceil(totalUsers.value / rowsPerPage.value)
  })

  const visiblePages = computed(() => {
    const pages = []
    const start = Math.max(1, currentPage.value - 2)
    const end = Math.min(totalPages.value, currentPage.value + 2)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  })

  // các hàm xử lý
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

  // chọn tất cả user
  const toggleSelectAll = () => {
    if (selectAll.value) {
      // chọn tất cả user hiện tại
      selectedUsers.value = []
      for (let i = 0; i < filteredUsers.value.length; i++) {
        selectedUsers.value.push(filteredUsers.value[i].id)
      }
    } else {
      // bỏ chọn tất cả
      selectedUsers.value = []
    }
  }

  // chuyển trang
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  // sửa user
  const editUser = (user) => {
    editingUser.value = user
    editUserData.value = {
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      status: user.status
    }
    showEditUserModal.value = true
  }

  // xóa user
  const deleteUser = (userId) => {
    // tìm user cần xóa
    let userToDelete = null
    for (let i = 0; i < users.value.length; i++) {
      if (users.value[i].id === userId) {
        userToDelete = users.value[i]
        break
      }
    }
    deletingUser.value = userToDelete
    showDeleteModal.value = true
  }

  // xác nhận xóa user
  const confirmDelete = () => {
    if (deletingUser.value) {
      const userName = deletingUser.value.name
      // xóa user khỏi danh sách
      const newUsers = []
      for (let i = 0; i < users.value.length; i++) {
        if (users.value[i].id !== deletingUser.value.id) {
          newUsers.push(users.value[i])
        }
      }
      users.value = newUsers
      showDeleteModal.value = false
      deletingUser.value = null
      
      // hiển thị thông báo
      alert(`User "${userName}" has been deleted successfully!`)
    }
  }

  // hủy xóa user
  const cancelDelete = () => {
    showDeleteModal.value = false
    deletingUser.value = null
  }

  const deleteSelectedUsers = () => {
    if (selectedUsers.value.length === 0) {
      alert('Please select users to delete')
      return
    }
    
    const selectedCount = selectedUsers.value.length
    if (confirm(`Are you sure you want to delete ${selectedCount} selected user(s)?`)) {
      users.value = users.value.filter(user => !selectedUsers.value.includes(user.id))
      selectedUsers.value = []
      selectAll.value = false
      alert(`${selectedCount} user(s) have been deleted successfully!`)
    }
  }

  // thêm user mới
  const addUser = () => {
    const newId = Date.now() // tạo id mới
    const today = new Date()
    const dateString = today.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    
    const user = {
      id: newId,
      name: newUser.value.name,
      email: newUser.value.email,
      username: newUser.value.username,
      status: 'Active',
      role: newUser.value.role,
      joinedDate: dateString,
      lastActive: 'Just now',
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face`
    }
    
    // thêm user vào đầu danh sách
    users.value.unshift(user)
    showAddUserModal.value = false
    
    // reset form
    newUser.value = {
      name: '',
      email: '',
      username: '',
      role: ''
    }
  }

  // cập nhật user
  const updateUser = () => {
    // tìm user cần sửa
    let userIndex = -1
    for (let i = 0; i < users.value.length; i++) {
      if (users.value[i].id === editingUser.value.id) {
        userIndex = i
        break
      }
    }
    
    if (userIndex !== -1) {
      // cập nhật thông tin user
      users.value[userIndex].name = editUserData.value.name
      users.value[userIndex].email = editUserData.value.email
      users.value[userIndex].username = editUserData.value.username
      users.value[userIndex].role = editUserData.value.role
      users.value[userIndex].status = editUserData.value.status
      users.value[userIndex].lastActive = 'Just now'
    }
    
    showEditUserModal.value = false
    editingUser.value = null
    
    // reset form
    editUserData.value = {
      name: '',
      email: '',
      username: '',
      role: '',
      status: ''
    }
  }

  // trả về tất cả biến và hàm
  return {
    // dữ liệu
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
    
    // tính toán
    filteredUsers,
    totalUsers,
    totalPages,
    visiblePages,
    
    // hàm xử lý
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
  }
}
