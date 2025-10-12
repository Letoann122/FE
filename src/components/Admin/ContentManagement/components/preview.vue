<template>
  <div v-if="show" class="cm modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">
          <i class="fas fa-eye text-info me-2"></i>
          Xem trước nội dung
        </h3>
        <button class="btn-close" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="modal-body">
        <div v-if="content" class="content-preview">
          <!-- Content Header -->
          <div class="preview-header">
            <div class="content-meta">
              <span class="type-badge" :class="getTypeClass(content.type)">
                <i :class="getTypeIcon(content.type)" class="me-1"></i>
                {{ getTypeLabel(content.type) }}
              </span>
              <span class="status-badge" :class="getStatusClass(content.status)">
                <i :class="getStatusIcon(content.status)" class="me-1"></i>
                {{ getStatusLabel(content.status) }}
              </span>
              <span v-if="content.isFeatured" class="featured-badge">
                <i class="fas fa-star"></i>
                Nổi bật
              </span>
            </div>
            
            <h1 class="content-title">{{ content.title }}</h1>
            
            <div class="content-info">
              <div class="info-item">
                <i class="fas fa-user text-muted"></i>
                <span>{{ content.author }}</span>
              </div>
              <div class="info-item">
                <i class="fas fa-calendar text-muted"></i>
                <span>{{ formatDate(content.createdAt) }}</span>
              </div>
              <div class="info-item">
                <i class="fas fa-folder text-muted"></i>
                <span>{{ content.category }}</span>
              </div>
            </div>
          </div>

          <!-- Content Excerpt -->
          <div v-if="content.excerpt" class="content-excerpt">
            <p>{{ content.excerpt }}</p>
          </div>

          <!-- Content Images -->
          <div v-if="content.images && content.images.length > 0" class="content-images">
            <div class="image-gallery">
              <div 
                v-for="(image, index) in content.images" 
                :key="index"
                class="image-item"
                @click="openImageModal(image)"
              >
                <img :src="image.url || image" :alt="`Hình ảnh ${index + 1}`" />
                <div class="image-overlay">
                  <i class="fas fa-search-plus"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Content Body -->
          <div class="content-body">
            <div class="content-text" v-html="formatContent(content.content)"></div>
          </div>

          <!-- Content Tags -->
          <div v-if="content.tags && content.tags.length > 0" class="content-tags">
            <h6 class="tags-title">
              <i class="fas fa-tags text-muted me-2"></i>
              Thẻ:
            </h6>
            <div class="tags-list">
              <span 
                v-for="tag in content.tags" 
                :key="tag"
                class="tag-item"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Content Statistics -->
          <div class="content-stats">
            <div class="stats-grid">
              <div class="stat-item">
                <i class="fas fa-eye text-primary"></i>
                <span class="stat-number">{{ formatNumber(content.views) }}</span>
                <span class="stat-label">Lượt xem</span>
              </div>
              <div class="stat-item">
                <i class="fas fa-heart text-danger"></i>
                <span class="stat-number">{{ formatNumber(content.likes) }}</span>
                <span class="stat-label">Lượt thích</span>
              </div>
              <div class="stat-item">
                <i class="fas fa-comment text-info"></i>
                <span class="stat-number">{{ formatNumber(content.comments) }}</span>
                <span class="stat-label">Bình luận</span>
              </div>
            </div>
          </div>

          
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeModal">
          <i class="fas fa-times me-2"></i>
          Đóng
        </button>
        <button 
          v-if="content && content.status === 'pending'"
          type="button" 
          class="btn btn-success"
          @click="approveContent"
        >
          <i class="fas fa-check me-2"></i>
          Duyệt nội dung
        </button>
        <button 
          v-if="content && content.status === 'pending'"
          type="button" 
          class="btn btn-warning"
          @click="rejectContent"
        >
          <i class="fas fa-times me-2"></i>
          Từ chối
        </button>
        <button 
          type="button" 
          class="btn btn-primary"
          @click="editContent"
        >
          <i class="fas fa-edit me-2"></i>
          Chỉnh sửa
        </button>
      </div>
    </div>

    <!-- Image Modal -->
    <div v-if="showImageModal" class="image-modal-overlay" @click="closeImageModal">
      <div class="image-modal-container" @click.stop>
        <button class="image-modal-close" @click="closeImageModal">
          <i class="fas fa-times"></i>
        </button>
        <img :src="selectedImage" :alt="'Hình ảnh'" class="modal-image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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

const emit = defineEmits(['close', 'approve-content', 'reject-content', 'edit-content'])

const showImageModal = ref(false)
const selectedImage = ref('')

const closeModal = () => {
  emit('close')
}

const closeImageModal = () => {
  showImageModal.value = false
  selectedImage.value = ''
}

const openImageModal = (image) => {
  selectedImage.value = image.url || image
  showImageModal.value = true
}

const approveContent = () => {
  emit('approve-content', props.content)
}

const rejectContent = () => {
  emit('reject-content', props.content)
}

const editContent = () => {
  emit('edit-content', props.content)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const formatContent = (content) => {
  // Simple formatting - in real app, you might use a rich text editor
  return content.replace(/\n/g, '<br>')
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
  max-width: 800px;
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

.content-preview {
  max-width: 100%;
}

.preview-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e9ecef;
}

.content-meta {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.type-badge,
.status-badge,
.featured-badge {
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

.featured-badge {
  background: #fff3cd;
  color: #856404;
}

.content-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.content-info {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.9rem;
}

.content-excerpt {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  border-left: 4px solid #dc3545;
}

.content-excerpt p {
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #495057;
  font-style: italic;
}

.content-images {
  margin-bottom: 2rem;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.image-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.image-item:hover {
  transform: scale(1.02);
}

.image-item img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.image-item:hover .image-overlay {
  opacity: 1;
}

.image-overlay i {
  color: white;
  font-size: 2rem;
}

.content-body {
  margin-bottom: 2rem;
}

.content-text {
  font-size: 1rem;
  line-height: 1.8;
  color: #495057;
}

.content-tags {
  margin-bottom: 2rem;
}

.tags-title {
  color: #6c757d;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-item {
  background: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.content-stats {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.stat-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-item i {
  font-size: 1.5rem;
}

.stat-number {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2c3e50;
}

.stat-label {
  font-size: 0.85rem;
  color: #6c757d;
  font-weight: 500;
}

.seo-info {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 1.5rem;
}

.seo-title {
  color: #856404;
  margin-bottom: 1rem;
  font-weight: 600;
}

.seo-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.seo-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.seo-item label {
  font-weight: 600;
  color: #856404;
  font-size: 0.9rem;
}

.seo-item span {
  color: #495057;
  font-size: 0.9rem;
  line-height: 1.4;
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

.btn-primary {
  background: #0d6efd;
  border-color: #0d6efd;
  color: white;
}

.btn-primary:hover {
  background: #0b5ed7;
  border-color: #0a58ca;
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

.btn-warning {
  background: #ffc107;
  border-color: #ffc107;
  color: #000;
}

.btn-warning:hover {
  background: #ffca2c;
  border-color: #ffc720;
}

/* Image Modal */
.image-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1060;
  padding: 2rem;
}

.image-modal-container {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.image-modal-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
}

.image-modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.modal-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 0.5rem;
  }
  
  .modal-container {
    max-height: 95vh;
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
  
  .content-title {
    font-size: 1.5rem;
  }
  
  .content-info {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .image-gallery {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
