<template>
  <div class="cm content-table-container">
    <div class="table-responsive">
      <table class="table table-hover content-table">
        <thead class="table-header">
          <tr>
            <th class="checkbox-column">
              <input
                type="checkbox"
                class="form-check-input"
                :checked="selectAll"
                @change="$emit('toggle-select-all')"
              />
            </th>
            <th class="title-column">Tiêu đề</th>
            <th class="type-column">Loại</th>
            <th class="category-column">Danh mục</th>
            <th class="author-column">Tác giả</th>
            <th class="status-column">Trạng thái</th>
            <th class="date-column">Ngày tạo</th>
            <th class="actions-column">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="content in filteredContents" 
            :key="content.id"
            class="table-row"
            :class="{ 'selected': selectedContents.includes(content.id) }"
          >
            <!-- Checkbox -->
            <td class="checkbox-cell">
              <input
                type="checkbox"
                class="form-check-input"
                :checked="selectedContents.includes(content.id)"
                @change="toggleSelectContent(content.id)"
              />
            </td>

            <!-- Title -->
            <td class="title-cell">
              <div class="content-title">
                <div class="title-text">
                  {{ content.title }}
                  <span v-if="content.isFeatured" class="featured-badge">
                    <i class="fas fa-star"></i>
                  </span>
                </div>
                <div class="excerpt-text" v-if="content.excerpt">
                  {{ truncateText(content.excerpt, 60) }}
                </div>
                <div class="tags-row" v-if="content.tags && content.tags.length > 0">
                  <span 
                    v-for="tag in content.tags.slice(0, 3)" 
                    :key="tag"
                    class="tag-badge"
                  >
                    {{ tag }}
                  </span>
                  <span v-if="content.tags.length > 3" class="more-tags">
                    +{{ content.tags.length - 3 }}
                  </span>
                </div>
              </div>
            </td>

            <!-- Type -->
            <td class="type-cell">
              <span class="type-badge" :class="getTypeClass(content.type)">
                {{ getTypeLabel(content.type) }}
              </span>
            </td>

            <!-- Category -->
            <td class="category-cell">
              <span class="category-text">{{ content.category }}</span>
            </td>

            <!-- Author -->
            <td class="author-cell">
              <div class="author-info">
                <div class="author-name">{{ content.author }}</div>
              </div>
            </td>

            <!-- Status -->
            <td class="status-cell">
              <span class="status-badge" :class="getStatusClass(content.status)">
                {{ getStatusLabel(content.status) }}
              </span>
            </td>

            <!-- Date -->
            <td class="date-cell">
              <div class="date-info">
                <div class="date-text">{{ formatDate(content.createdAt) }}</div>
                <div class="time-text">{{ formatTime(content.createdAt) }}</div>
              </div>
            </td>

            <!-- Actions -->
            <td class="actions-cell">
              <div class="action-buttons">
                <button
                  class="btn btn-outline-info btn-xs action-btn"
                  @click="$emit('preview-content', content)"
                  title="Xem trước"
                >
                  <i class="fas fa-eye"></i>
                </button>
                
                <button
                  class="btn btn-outline-primary btn-xs action-btn"
                  @click="$emit('edit-content', content)"
                  title="Chỉnh sửa"
                >
                  <i class="fas fa-edit"></i>
                </button>

                <button
                  v-if="content.status === 'pending'"
                  class="btn btn-outline-success btn-xs action-btn"
                  @click="$emit('approve-content', content)"
                  title="Duyệt nội dung"
                >
                  <i class="fas fa-check"></i>
                </button>

                <button
                  v-if="content.status === 'pending'"
                  class="btn btn-outline-warning btn-xs action-btn"
                  @click="$emit('reject-content', content)"
                  title="Từ chối nội dung"
                >
                  <i class="fas fa-times"></i>
                </button>

                <button
                  class="btn btn-outline-danger btn-xs action-btn"
                  @click="$emit('delete-content', content)"
                  title="Xóa"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-if="filteredContents.length === 0" class="empty-state">
      <div class="empty-icon">
        <i class="fas fa-newspaper"></i>
      </div>
      <h4 class="empty-title">Không tìm thấy nội dung</h4>
      <p class="empty-description">
        Không có nội dung nào phù hợp với bộ lọc hiện tại. Hãy thử thay đổi bộ lọc hoặc thêm nội dung mới.
      </p>
      <button 
        class="btn btn-primary"
        @click="$emit('add-content')"
      >
        <i class="fas fa-plus me-2"></i>
        Thêm nội dung mới
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  filteredContents: {
    type: Array,
    default: () => []
  },
  selectAll: {
    type: Boolean,
    default: false
  },
  selectedContents: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([
  'toggle-select-all',
  'edit-content',
  'delete-content',
  'approve-content',
  'reject-content',
  'preview-content',
  'add-content'
])

const toggleSelectContent = (contentId) => {
  const selected = [...props.selectedContents]
  const index = selected.indexOf(contentId)
  
  if (index > -1) {
    selected.splice(index, 1)
  } else {
    selected.push(contentId)
  }
  
  emit('update:selectedContents', selected)
}

const truncateText = (text, length) => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN')
}

const formatTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('vi-VN', { 
    hour: '2-digit', 
    minute: '2-digit' 
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
.content-table-container {
  background: white;
}

.table-responsive {
  border-radius: 8px;
  overflow: hidden;
}

.content-table {
  margin: 0;
  border-collapse: separate;
  border-spacing: 0;
}

.table-header {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 2px solid #dee2e6;
}

.table-header th {
  border: none;
  padding: 1rem 0.75rem;
  font-weight: 600;
  color: #495057;
  font-size: 0.9rem;
  white-space: nowrap;
}

.table-row {
  transition: all 0.2s ease;
  border-bottom: 1px solid #f1f3f4;
}

.table-row:hover {
  background-color: #f8f9fa;
}

.table-row.selected {
  background-color: #e3f2fd;
  border-left: 3px solid #dc3545;
}

.table-row td {
  border: none;
  padding: 1rem 0.75rem;
  vertical-align: top;
}

/* Column widths */
.checkbox-column { width: 50px; min-width: 50px; }
.title-column { width: 300px; min-width: 250px; }
.type-column { width: 120px; min-width: 100px; }
.category-column { width: 120px; min-width: 100px; }
.author-column { width: 150px; min-width: 120px; }
.status-column { width: 120px; min-width: 100px; }
.date-column { width: 120px; min-width: 100px; }
.actions-column { width: 150px; min-width: 130px; }

/* Content title */
.content-title {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.title-text {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.95rem;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.featured-badge {
  color: #ffc107;
  font-size: 0.8rem;
}

.excerpt-text {
  font-size: 0.85rem;
  color: #6c757d;
  line-height: 1.3;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tag-badge {
  background: #e9ecef;
  color: #495057;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.more-tags {
  color: #6c757d;
  font-size: 0.75rem;
  font-style: italic;
}

/* Type badges */
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

/* Status badges */
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
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

/* Stats column removed */

/* Date */
.date-info {
  display: flex;
  flex-direction: column;
}

.date-text {
  font-size: 0.85rem;
  font-weight: 500;
  color: #495057;
}

.time-text {
  font-size: 0.8rem;
  color: #6c757d;
}

/* Actions */
.action-buttons {
  display: flex;
  gap: 0.2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.action-btn {
  padding: 0.25rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
  min-width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-xs {
  padding: 0.25rem 0.4rem;
  font-size: 0.75rem;
  line-height: 1;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  color: #6c757d;
}

.empty-icon {
  font-size: 4rem;
  color: #dee2e6;
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 0.5rem;
}

.empty-description {
  font-size: 1rem;
  margin-bottom: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

/* Responsive */
@media (max-width: 1400px) {
  .table-responsive {
    overflow-x: auto;
  }
  
  .content-table {
    min-width: 1200px;
  }
}

@media (max-width: 768px) {
  .table-header th,
  .table-row td {
    padding: 0.75rem 0.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
