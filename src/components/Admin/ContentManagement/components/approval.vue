<template>
  <div v-if="show" class="cm modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">
          <i :class="[getApprovalIcon(), getApprovalColor(), 'me-2']"></i>
          {{ getApprovalTitle() }}
        </h3>
        <button class="btn-close" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="modal-body">
        <div v-if="content" class="content-summary">
          <div class="summary-header">
            <h5>Thông tin nội dung:</h5>
          </div>
          
          <div class="summary-content">
            <div class="summary-item">
              <span class="summary-label">Tiêu đề:</span>
              <span class="summary-value">{{ content.title }}</span>
            </div>
            
            <div class="summary-item">
              <span class="summary-label">Loại:</span>
              <span class="summary-value">
                <span class="type-badge" :class="getTypeClass(content.type)">
                  <i :class="getTypeIcon(content.type)" class="me-1"></i>
                  {{ getTypeLabel(content.type) }}
                </span>
              </span>
            </div>
            
            <div class="summary-item">
              <span class="summary-label">Tác giả:</span>
              <span class="summary-value">{{ content.author }}</span>
            </div>
            
            <div class="summary-item">
              <span class="summary-label">Ngày tạo:</span>
              <span class="summary-value">{{ formatDate(content.createdAt) }}</span>
            </div>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="approval-form">
          <div class="form-group">
            <label class="form-label required">
              {{ approvalType === 'approve' ? 'Ghi chú duyệt' : 'Lý do từ chối' }}
            </label>
            <textarea
              class="form-control"
              v-model="approvalNote"
              :placeholder="getPlaceholderText()"
              rows="4"
              required
            ></textarea>
            <div class="form-help">
              {{ getHelpText() }}
            </div>
          </div>

          <div v-if="approvalType === 'approve'" class="approval-options">
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="publishNow"
                v-model="publishNow"
              />
              <label class="form-check-label" for="publishNow">
                Xuất bản ngay sau khi duyệt
              </label>
            </div>
            
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="markFeatured"
                v-model="markFeatured"
              />
              <label class="form-check-label" for="markFeatured">
                Đánh dấu là nội dung nổi bật
              </label>
            </div>
          </div>

          <div v-if="approvalType === 'reject'" class="rejection-options">
            <div class="form-group">
              <label class="form-label">Gửi thông báo cho tác giả</label>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="notifyAuthor"
                  v-model="notifyAuthor"
                />
                <label class="form-check-label" for="notifyAuthor">
                  Gửi email thông báo về việc từ chối
                </label>
              </div>
            </div>
          </div>
        </form>

        <div class="warning-section" v-if="approvalType === 'approve'">
          <div class="warning-header">
            <i class="fas fa-info-circle text-info me-2"></i>
            <span>Lưu ý khi duyệt:</span>
          </div>
          <ul class="warning-list">
            <li>Nội dung sẽ được công khai và người dùng có thể xem được</li>
            <li>Hãy đảm bảo nội dung đã được kiểm tra kỹ lưỡng</li>
            <li>Nội dung nổi bật sẽ hiển thị ở vị trí ưu tiên</li>
          </ul>
        </div>

        <div class="warning-section" v-if="approvalType === 'reject'">
          <div class="warning-header">
            <i class="fas fa-exclamation-triangle text-warning me-2"></i>
            <span>Lưu ý khi từ chối:</span>
          </div>
          <ul class="warning-list">
            <li>Nội dung sẽ không được công khai</li>
            <li>Tác giả có thể chỉnh sửa và gửi lại để duyệt</li>
            <li>Hãy giải thích rõ lý do từ chối để tác giả cải thiện</li>
          </ul>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeModal">
          <i class="fas fa-times me-2"></i>
          Hủy bỏ
        </button>
        <button 
          type="button" 
          class="btn"
          :class="approvalType === 'approve' ? 'btn-success' : 'btn-danger'"
          @click="handleSubmit"
        >
          <i :class="getApprovalIcon()" class="me-2"></i>
          {{ approvalType === 'approve' ? 'Duyệt nội dung' : 'Từ chối nội dung' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  content: {
    type: Object,
    default: null
  },
  approvalType: {
    type: String,
    default: 'approve' // 'approve' hoặc 'reject'
  }
})

const emit = defineEmits(['close', 'approve', 'reject'])

const approvalNote = ref('')
const publishNow = ref(true)
const markFeatured = ref(false)
const notifyAuthor = ref(true)

// Watch for content changes
watch(() => props.content, (newContent) => {
  if (newContent) {
    resetForm()
  }
})

const closeModal = () => {
  emit('close')
  resetForm()
}

const resetForm = () => {
  approvalNote.value = ''
  publishNow.value = true
  markFeatured.value = false
  notifyAuthor.value = true
}

const handleSubmit = () => {
  if (!approvalNote.value.trim()) {
    alert('Vui lòng nhập ghi chú')
    return
  }

  const approvalData = {
    content: props.content,
    note: approvalNote.value,
    publishNow: publishNow.value,
    markFeatured: markFeatured.value,
    notifyAuthor: notifyAuthor.value
  }

  if (props.approvalType === 'approve') {
    emit('approve', approvalData)
  } else {
    emit('reject', approvalData)
  }

  closeModal()
}

const getApprovalTitle = () => {
  return props.approvalType === 'approve' ? 'Duyệt nội dung' : 'Từ chối nội dung'
}

const getApprovalIcon = () => {
  return props.approvalType === 'approve' ? 'fas fa-check' : 'fas fa-times'
}

const getApprovalColor = () => {
  return props.approvalType === 'approve' ? 'text-success' : 'text-danger'
}

const getPlaceholderText = () => {
  if (props.approvalType === 'approve') {
    return 'Nhập ghi chú về việc duyệt nội dung này...'
  } else {
    return 'Nhập lý do từ chối nội dung này...'
  }
}

const getHelpText = () => {
  if (props.approvalType === 'approve') {
    return 'Ghi chú này sẽ giúp tác giả hiểu rõ về việc duyệt nội dung.'
  } else {
    return 'Hãy giải thích rõ lý do từ chối để tác giả có thể cải thiện nội dung.'
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
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

.content-summary {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-left: 4px solid #dc3545;
}

.summary-header h5 {
  color: #495057;
  margin-bottom: 1rem;
  font-weight: 600;
}

.summary-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.summary-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.summary-label {
  font-weight: 500;
  color: #6c757d;
  min-width: 80px;
  flex-shrink: 0;
}

.summary-value {
  color: #495057;
  flex: 1;
}

.type-badge {
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

.approval-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.5rem;
  display: block;
}

.form-label.required::after {
  content: ' *';
  color: #dc3545;
}

.form-control {
  border-radius: 8px;
  border: 1px solid #dee2e6;
  padding: 0.75rem;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.form-control:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.form-help {
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 0.25rem;
}

.approval-options,
.rejection-options {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
}

.form-check {
  margin-bottom: 0.75rem;
}

.form-check-input {
  margin-top: 0.25rem;
}

.form-check-label {
  font-weight: 500;
  color: #495057;
  cursor: pointer;
}

.warning-section {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 1.5rem;
}

.warning-header {
  color: #856404;
  margin-bottom: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.warning-list {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

.warning-list li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  color: #856404;
  font-size: 0.9rem;
}

.warning-list li:last-child {
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

.btn-success {
  background: #198754;
  border-color: #198754;
  color: white;
}

.btn-success:hover {
  background: #157347;
  border-color: #146c43;
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
  
  .summary-item {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .summary-label {
    min-width: auto;
  }
}
</style>
