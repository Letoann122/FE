import { ref, computed } from 'vue'

// Hàm quản lý nội dung
export function useContentManagement() {
  // Các biến để lưu dữ liệu
  const searchQuery = ref('')
  const selectedType = ref('')
  const selectedStatus = ref('')
  const selectedCategory = ref('')
  const selectedDate = ref('')
  const selectAll = ref(false)
  const selectedContents = ref([])
  const currentPage = ref(1)
  const rowsPerPage = ref(10)
  
  // Các biến để hiển thị modal
  const showAddContentModal = ref(false)
  const showEditContentModal = ref(false)
  const showDeleteModal = ref(false)
  const showPreviewModal = ref(false)
  const showApprovalModal = ref(false)
  const showStatisticsPanel = ref(false)
  const editingContent = ref(null)
  const deletingContent = ref(null)
  const previewContentData = ref(null)
  const approvalContent = ref(null)
  const approvalType = ref('') // 'approve' hoặc 'reject'

  // Object để thêm nội dung mới
  const newContent = ref({
    title: '',
    type: '',
    category: '',
    content: '',
    excerpt: '',
    tags: [],
    images: [],
    author: '',
    isPublished: false,
    isFeatured: false
  })

  // Object để edit nội dung
  const editContentData = ref({
    id: null,
    title: '',
    type: '',
    category: '',
    content: '',
    excerpt: '',
    tags: [],
    images: [],
    author: '',
    isPublished: false,
    isFeatured: false
  })

  // Dữ liệu nội dung mẫu
  const contents = ref([
    {
      id: 1,
      title: 'Chiến dịch hiến máu mùa hè 2024',
      type: 'campaign',
      category: 'Chiến dịch',
      content: 'Chiến dịch hiến máu mùa hè 2024 với mục tiêu thu thập 10,000 đơn vị máu để đáp ứng nhu cầu cấp thiết...',
      excerpt: 'Chiến dịch hiến máu mùa hè 2024 với mục tiêu thu thập 10,000 đơn vị máu',
      tags: ['hiến máu', 'mùa hè', 'chiến dịch'],
      images: ['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop'],
      author: 'Nguyễn Văn A',
      status: 'approved',
      isPublished: true,
      isFeatured: true,
      views: 1250,
      likes: 89,
      comments: 23,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      publishedAt: '2024-01-16',
      
    },
    {
      id: 2,
      title: 'Lợi ích sức khỏe của việc hiến máu thường xuyên',
      type: 'article',
      category: 'Sức khỏe',
      content: 'Hiến máu không chỉ giúp cứu sống người khác mà còn mang lại nhiều lợi ích cho sức khỏe của chính bạn...',
      excerpt: 'Hiến máu mang lại nhiều lợi ích cho sức khỏe của bạn',
      tags: ['sức khỏe', 'hiến máu', 'lợi ích'],
      images: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop'],
      author: 'Bác sĩ Trần Thị B',
      status: 'approved',
      isPublished: true,
      isFeatured: false,
      views: 890,
      likes: 67,
      comments: 15,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12',
      publishedAt: '2024-01-11',
      
    },
    {
      id: 3,
      title: 'Thông báo về việc tạm dừng tiếp nhận hiến máu tại bệnh viện X',
      type: 'notification',
      category: 'Thông báo',
      content: 'Do tình hình dịch bệnh phức tạp, bệnh viện X sẽ tạm dừng tiếp nhận hiến máu từ ngày 25/01/2024...',
      excerpt: 'Tạm dừng tiếp nhận hiến máu tại bệnh viện X từ ngày 25/01/2024',
      tags: ['thông báo', 'tạm dừng', 'bệnh viện'],
      images: [],
      author: 'Admin',
      status: 'pending',
      isPublished: false,
      isFeatured: false,
      views: 0,
      likes: 0,
      comments: 0,
      createdAt: '2024-01-22',
      updatedAt: '2024-01-22',
      publishedAt: null,
      
    },
    {
      id: 4,
      title: 'Sự kiện hiến máu tại trường Đại học Y Hà Nội',
      type: 'event',
      category: 'Sự kiện',
      content: 'Sự kiện hiến máu tình nguyện sẽ được tổ chức tại trường Đại học Y Hà Nội vào ngày 28/01/2024...',
      excerpt: 'Sự kiện hiến máu tình nguyện tại Đại học Y Hà Nội ngày 28/01/2024',
      tags: ['sự kiện', 'hiến máu', 'đại học'],
      images: ['https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop'],
      author: 'Nguyễn Thị C',
      status: 'approved',
      isPublished: true,
      isFeatured: true,
      views: 567,
      likes: 34,
      comments: 8,
      createdAt: '2024-01-18',
      updatedAt: '2024-01-19',
      publishedAt: '2024-01-19',
      
    },
    {
      id: 5,
      title: 'Tin tức: Nhu cầu máu tăng cao trong dịp Tết',
      type: 'news',
      category: 'Tin tức',
      content: 'Theo thống kê từ các bệnh viện, nhu cầu máu trong dịp Tết Nguyên đán tăng cao 40% so với bình thường...',
      excerpt: 'Nhu cầu máu tăng cao 40% trong dịp Tết Nguyên đán',
      tags: ['tin tức', 'tết', 'nhu cầu máu'],
      images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'],
      author: 'Phóng viên D',
      status: 'approved',
      isPublished: true,
      isFeatured: false,
      views: 723,
      likes: 45,
      comments: 12,
      createdAt: '2024-01-14',
      updatedAt: '2024-01-15',
      publishedAt: '2024-01-15',
      
    }
  ])

  // Danh sách thẻ gợi ý theo chủ đề hiến máu
  const availableTags = ref([
    'hiến máu', 'tình nguyện', 'cứu người', 'đơn vị máu', 'ngân hàng máu',
    'truyền máu', 'an toàn truyền máu', 'nhóm máu O', 'nhóm máu A', 'nhóm máu B', 'nhóm máu AB',
    'hiến máu toàn phần', 'huyết tương', 'tiểu cầu', 'bạch cầu', 'hồng cầu',
    'sự kiện hiến máu', 'chiến dịch', 'điểm hiến máu', 'lịch hiến máu', 'đăng ký hiến máu',
    'bệnh viện', 'trung tâm hiến máu', 'viện huyết học', 'sức khỏe', 'kiểm tra sức khỏe',
    'chăm sóc sau hiến', 'dinh dưỡng', 'nghỉ ngơi', 'nước uống', 'sắt',
    'tuyên truyền', 'vận động hiến máu', 'câu lạc bộ hiến máu', 'đoàn thanh niên', 'đội tình nguyện',
    'tháng nhân đạo', 'ngày toàn dân hiến máu', 'lễ hội xuân hồng', 'giọt máu cho đi', 'sẻ chia sự sống',
    'câu chuyện người hiến', 'tôn vinh người hiến', 'ghi nhận đóng góp', 'khen thưởng', 'mốc đủ điều kiện',
    'câu hỏi thường gặp', 'điều kiện hiến máu', 'chống chỉ định', 'COVID-19', 'an toàn phòng dịch',
    'khẩn cấp', 'thiếu máu', 'kêu gọi khẩn', 'truyền thông', 'đăng ký online'
  ])

  // Computed statistics - tính toán thực tế từ dữ liệu
  const statistics = computed(() => {
    const total = contents.value.length
    const published = contents.value.filter(c => c.status === 'approved').length
    const pending = contents.value.filter(c => c.status === 'pending').length
    const rejected = contents.value.filter(c => c.status === 'rejected').length
    const totalViews = contents.value.reduce((sum, c) => sum + (c.views || 0), 0)
    const totalLikes = contents.value.reduce((sum, c) => sum + (c.likes || 0), 0)
    const totalComments = contents.value.reduce((sum, c) => sum + (c.comments || 0), 0)
    
    // Tính toán theo loại
    const byType = contents.value.reduce((acc, c) => {
      acc[c.type] = (acc[c.type] || 0) + 1
      return acc
    }, {})
    
    // Tính toán theo danh mục
    const byCategory = contents.value.reduce((acc, c) => {
      acc[c.category] = (acc[c.category] || 0) + 1
      return acc
    }, {})
    
    return {
      total,
      published,
      pending,
      rejected,
      totalViews,
      totalLikes,
      totalComments,
      byType,
      byCategory
    }
  })

  // Computed properties
  const filteredContents = computed(() => {
    let filtered = contents.value

    // Lọc theo từ khóa tìm kiếm
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(content => 
        content.title.toLowerCase().includes(query) ||
        content.content.toLowerCase().includes(query) ||
        content.author.toLowerCase().includes(query) ||
        content.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Lọc theo loại nội dung
    if (selectedType.value) {
      filtered = filtered.filter(content => content.type === selectedType.value)
    }

    // Lọc theo trạng thái
    if (selectedStatus.value) {
      filtered = filtered.filter(content => content.status === selectedStatus.value)
    }

    // Lọc theo danh mục
    if (selectedCategory.value) {
      filtered = filtered.filter(content => content.category === selectedCategory.value)
    }

    // Lọc theo ngày
    if (selectedDate.value) {
      const selectedDateObj = new Date(selectedDate.value)
      filtered = filtered.filter(content => {
        const contentDate = new Date(content.createdAt)
        return contentDate.toDateString() === selectedDateObj.toDateString()
      })
    }

    return filtered
  })

  const totalContents = computed(() => filteredContents.value.length)
  
  const totalPages = computed(() => Math.ceil(totalContents.value / rowsPerPage.value))
  
  const visiblePages = computed(() => {
    const pages = []
    const current = currentPage.value
    const total = totalPages.value
    
    // Hiển thị tối đa 5 trang
    let start = Math.max(1, current - 2)
    let end = Math.min(total, current + 2)
    
    // Điều chỉnh nếu gần đầu hoặc cuối
    if (end - start < 4) {
      if (start === 1) {
        end = Math.min(total, start + 4)
      } else {
        start = Math.max(1, end - 4)
      }
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    return pages
  })

  // Methods
  const statusClassName = (status) => {
    const classes = {
      'approved': 'badge-success',
      'pending': 'badge-warning',
      'rejected': 'badge-danger',
      'draft': 'badge-secondary'
    }
    return classes[status] || 'badge-secondary'
  }

  const typeClassName = (type) => {
    const classes = {
      'news': 'text-primary',
      'article': 'text-info',
      'campaign': 'text-danger',
      'notification': 'text-warning',
      'event': 'text-success'
    }
    return classes[type] || 'text-secondary'
  }

  const toggleSelectAll = () => {
    if (selectAll.value) {
      selectedContents.value = filteredContents.value.map(content => content.id)
    } else {
      selectedContents.value = []
    }
  }

  const goToPage = (page) => {
    currentPage.value = page
  }

  const editContent = (content) => {
    editingContent.value = content
    editContentData.value = { ...content }
    showEditContentModal.value = true
  }

  const deleteContent = (content) => {
    deletingContent.value = content
    showDeleteModal.value = true
  }

  const confirmDelete = () => {
    if (deletingContent.value) {
      const index = contents.value.findIndex(c => c.id === deletingContent.value.id)
      if (index > -1) {
        contents.value.splice(index, 1)
      }
      showDeleteModal.value = false
      deletingContent.value = null
    }
  }

  const cancelDelete = () => {
    showDeleteModal.value = false
    deletingContent.value = null
  }

  const deleteSelectedContents = () => {
    if (selectedContents.value.length > 0) {
      contents.value = contents.value.filter(content => !selectedContents.value.includes(content.id))
      selectedContents.value = []
      selectAll.value = false
    }
  }

  const addContent = (contentData) => {
    const newId = Math.max(...contents.value.map(c => c.id)) + 1
    const newContentItem = {
      id: newId,
      ...contentData,
      status: 'pending',
      views: 0,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      publishedAt: contentData.isPublished ? new Date().toISOString().split('T')[0] : null
    }
    contents.value.unshift(newContentItem)
    showAddContentModal.value = false
    resetNewContent()
  }

  const updateContent = (contentData) => {
    const index = contents.value.findIndex(c => c.id === contentData.id)
    if (index > -1) {
      contents.value[index] = {
        ...contents.value[index],
        ...contentData,
        updatedAt: new Date().toISOString().split('T')[0],
        publishedAt: contentData.isPublished && !contents.value[index].publishedAt 
          ? new Date().toISOString().split('T')[0] 
          : contents.value[index].publishedAt
      }
    }
    showEditContentModal.value = false
    editingContent.value = null
  }

  const resetNewContent = () => {
    newContent.value = {
      title: '',
      type: '',
      category: '',
      content: '',
      excerpt: '',
      tags: [],
      images: [],
      author: '',
      isPublished: false,
      isFeatured: false
    }
  }

  const previewContent = (content) => {
    previewContentData.value = content
    showPreviewModal.value = true
  }

  const approveContent = (content) => {
    approvalContent.value = content
    approvalType.value = 'approve'
    showApprovalModal.value = true
  }

  const rejectContent = (content) => {
    approvalContent.value = content
    approvalType.value = 'reject'
    showApprovalModal.value = true
  }

  const handleApprove = (approvalData) => {
    const { content, note, publishNow, markFeatured } = approvalData
    const index = contents.value.findIndex(c => c.id === content.id)
    if (index > -1) {
      contents.value[index].status = 'approved'
      contents.value[index].updatedAt = new Date().toISOString().split('T')[0]
      if (publishNow) {
        contents.value[index].isPublished = true
        contents.value[index].publishedAt = new Date().toISOString().split('T')[0]
      }
      if (markFeatured) {
        contents.value[index].isFeatured = true
      }
    }
    showApprovalModal.value = false
    approvalContent.value = null
  }

  const handleReject = (approvalData) => {
    const { content, note } = approvalData
    const index = contents.value.findIndex(c => c.id === content.id)
    if (index > -1) {
      contents.value[index].status = 'rejected'
      contents.value[index].updatedAt = new Date().toISOString().split('T')[0]
    }
    showApprovalModal.value = false
    approvalContent.value = null
  }

  const bulkApproveContents = () => {
    if (selectedContents.value.length > 0) {
      selectedContents.value.forEach(contentId => {
        const index = contents.value.findIndex(c => c.id === contentId)
        if (index > -1) {
          contents.value[index].status = 'approved'
          contents.value[index].updatedAt = new Date().toISOString().split('T')[0]
          if (!contents.value[index].publishedAt && contents.value[index].isPublished) {
            contents.value[index].publishedAt = new Date().toISOString().split('T')[0]
          }
        }
      })
      selectedContents.value = []
      selectAll.value = false
    }
  }

  const bulkRejectContents = () => {
    if (selectedContents.value.length > 0) {
      selectedContents.value.forEach(contentId => {
        const index = contents.value.findIndex(c => c.id === contentId)
        if (index > -1) {
          contents.value[index].status = 'rejected'
          contents.value[index].updatedAt = new Date().toISOString().split('T')[0]
        }
      })
      selectedContents.value = []
      selectAll.value = false
    }
  }

  return {
    // Reactive data
    searchQuery,
    selectedType,
    selectedStatus,
    selectedCategory,
    selectedDate,
    selectAll,
    selectedContents,
    currentPage,
    rowsPerPage,
    showAddContentModal,
    showEditContentModal,
    showDeleteModal,
    showPreviewModal,
    showApprovalModal,
    showStatisticsPanel,
    editingContent,
    deletingContent,
    previewContentData,
    approvalContent,
    approvalType,
    newContent,
    editContentData,
    contents,
    statistics,
    availableTags,

    // Computed
    filteredContents,
    totalContents,
    totalPages,
    visiblePages,

    // Methods
    statusClassName,
    typeClassName,
    toggleSelectAll,
    goToPage,
    editContent,
    deleteContent,
    confirmDelete,
    cancelDelete,
    deleteSelectedContents,
    addContent,
    updateContent,
    previewContent,
    approveContent,
    rejectContent,
    handleApprove,
    handleReject,
    bulkApproveContents,
    bulkRejectContents
  }
}
