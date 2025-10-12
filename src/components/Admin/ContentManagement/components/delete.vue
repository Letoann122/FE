<template>
  <div v-if="show" class="cm modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">
          <i class="fas fa-exclamation-triangle text-warning me-2"></i>
          Xác nhận xóa nội dung
        </h3>
        <button class="btn-close" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="modal-body">
        <div class="warning-icon">
          <i class="fas fa-trash-alt"></i>
        </div>
        
        <div class="warning-message">
          <h4>Bạn có chắc chắn muốn xóa nội dung này?</h4>
          <p class="text-muted">
            Hành động này không thể hoàn tác. Nội dung sẽ bị xóa vĩnh viễn khỏi hệ thống.
          </p>
        </div>

        <div v-if="content" class="content-preview">
          <div class="preview-header">
            <h5>Thông tin nội dung sẽ bị xóa:</h5>
          </div>
          
          <div class="preview-content">
            <div class="preview-item">
              <span class="preview-label">Tiêu đề:</span>
              <span class="preview-value">{{ content.title }}</span>
            </div>
            
            <div class="preview-item">
              <span class="preview-label">Loại:</span>
              <span class="preview-value">
                <span class="type-badge" :class="getTypeClass(content.type)">
                  <i :class="getTypeIcon(content.type)" class="me-1"></i>
                  {{ getTypeLabel(content.type) }}
                </span>
              </span>
            </div>
            
            <div class="preview-item">
              <span class="preview-label">Danh mục:</span>
              <span class="preview-value">{{ content.category }}</span>
            </div>
            
            <div class="preview-item">
              <span class="preview-label">Tác giả:</span>
              <span class="preview-value">{{ content.author }}</span>
            </div>
            
            <div class="preview-item">
              <span class="preview-label">Trạng thái:</span>
              <span class="preview-value">
                <span class="status-badge" :class="getStatusClass(content.status)">
                  <i :class="getStatusIcon(content.status)" class="me-1"></i>
                  {{ getStatusLabel(content.status) }}
                </span>
              </span>
            </div>
            
            <div class="preview-item">
              <span class="preview-label">Ngày tạo:</span>
              <span class="preview-value">{{ formatDate(content.createdAt) }}</span>
            </div>
            
            <div v-if="content.views > 0 || content.likes > 0 || content.comments > 0" class="preview-item">
              <span class="preview-label">Thống kê:</span>
              <span class="preview-value">
                <span class="stat-item">
                  <i class="fas fa-eye text-muted"></i>
                  {{ formatNumber(content.views) }}
                </span>
                <span class="stat-item">
                  <i class="fas fa-heart text-danger"></i>
                  {{ formatNumber(content.likes) }}
                </span>
                <span class="stat-item">
                  <i class="fas fa-comment text-info"></i>
                  {{ formatNumber(content.comments) }}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div class="warning-consequences">
          <h6 class="consequences-title">
            <i class="fas fa-info-circle text-info me-2"></i>
            Hậu quả của việc xóa:
          </h6>
          <ul class="consequences-list">
            <li>
              <i class="fas fa-times-circle text-danger me-2"></i>
              Nội dung sẽ bị xóa vĩnh viễn khỏi cơ sở dữ liệu
            </li>
            <li>
              <i class="fas fa-times-circle text-danger me-2"></i>
              Tất cả dữ liệu liên quan (hình ảnh, thẻ, bình luận) sẽ bị mất
            </li>
            <li>
              <i class="fas fa-times-circle text-danger me-2"></i>
              Liên kết đến nội dung này sẽ không còn hoạt động
            </li>
            <li>
              <i class="fas fa-times-circle text-danger me-2"></i>
              Không thể khôi phục sau khi xóa
            </li>
          </ul>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeModal">
          <i class="fas fa-times me-2"></i>
          Hủy bỏ
        </button>
        <button type="button" class="btn btn-danger" @click="confirmDelete">
          <i class="fas fa-trash me-2"></i>
          Xóa vĩnh viễn
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  content: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['cancel', 'confirm'])

const closeModal = () => {
  emit('cancel')
}

const confirmDelete = () => {
  emit('confirm')
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN')
}

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const getTypeClass = (type) => {
  const classes = {
    'news': 'type-news',
    'article': 'type-article',
    'campaign': 'type-campaign',
    'notification': 'type-notification',
    'event': 'type-event'
  }
  return classes[type] || 'type-default'
}

const getTypeIcon = (type) => {
  const icons = {
    'news': 'fas fa-newspaper',
    'article': 'fas fa-file-alt',
    'campaign': 'fas fa-heart',
    'notification': 'fas fa-bullhorn',
    'event': 'fas fa-calendar-alt'
  }
  return icons[type] || 'fas fa-file'
}

const getTypeLabel = (type) => {
  const labels = {
    'news': 'Tin tức',
    'article': 'Bài viết',
    'campaign': 'Chiến dịch',
    'notification': 'Thông báo',
    'event': 'Sự kiện'
  }
  return labels[type] || 'Khác'
}

const getStatusClass = (status) => {
  const classes = {
    'approved': 'status-approved',
    'pending': 'status-pending',
    'rejected': 'status-rejected',
    'draft': 'status-draft'
  }
  return classes[status] || 'status-default'
}

const getStatusIcon = (status) => {
  const icons = {
    'approved': 'fas fa-check-circle',
    'pending': 'fas fa-clock',
    'rejected': 'fas fa-times-circle',
    'draft': 'fas fa-edit'
  }
  return icons[status] || 'fas fa-question-circle'
}

const getStatusLabel = (status) => {
  const labels = {
    'approved': 'Đã duyệt',
    'pending': 'Chờ duyệt',
    'rejected': 'Từ chối',
    'draft': 'Nháp'
  }
  return labels[status] || 'Không xác định'
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  padding: 1rem;
}

.modal-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
  max-height: 95vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  display: flex;
  align-items: center;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #6c757d;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.btn-close:hover {
  background: #f8f9fa;
  color: #495057;
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
  max-height: calc(95vh - 200px);
}

.warning-icon {
  text-align: center;
  margin-bottom: 1.5rem;
}

.warning-icon i {
  font-size: 4rem;
  color: #dc3545;
}

.warning-message {
  text-align: center;
  margin-bottom: 2rem;
}

.warning-message h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.content-preview {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-left: 4px solid #dc3545;
}

.preview-header h5 {
  color: #495057;
  margin-bottom: 1rem;
  font-weight: 600;
}

.preview-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.preview-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.preview-label {
  font-weight: 500;
  color: #6c757d;
  min-width: 100px;
  flex-shrink: 0;
}

.preview-value {
  color: #495057;
  flex: 1;
}

.type-badge,
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
}

.type-news {
  background: #e3f2fd;
  color: #1976d2;
}

.type-article {
  background: #e8f5e8;
  color: #388e3c;
}

.type-campaign {
  background: #ffebee;
  color: #d32f2f;
}

.type-notification {
  background: #fff3e0;
  color: #f57c00;
}

.type-event {
  background: #f3e5f5;
  color: #7b1fa2;
}

.status-approved {
  background: #d4edda;
  color: #155724;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-rejected {
  background: #f8d7da;
  color: #721c24;
}

.status-draft {
  background: #e2e3e5;
  color: #383d41;
}

.stat-item {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-right: 1rem;
  font-size: 0.9rem;
}

.stat-item i {
  width: 12px;
}

.warning-consequences {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 1.5rem;
}

.consequences-title {
  color: #856404;
  margin-bottom: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.consequences-list {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

.consequences-list li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  color: #856404;
  font-size: 0.9rem;
}

.consequences-list li:last-child {
  margin-bottom: 0;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  background: #f8f9fa;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.btn-secondary {
  background: #6c757d;
  border-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
  border-color: #545b62;
}

.btn-danger {
  background: #dc3545;
  border-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
  border-color: #bd2130;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 0.5rem;
  }
  
  .modal-container {
    max-height: 90vh;
    overflow-y: auto;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1rem;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
  
  .preview-item {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .preview-label {
    min-width: auto;
  }
}
</style>
