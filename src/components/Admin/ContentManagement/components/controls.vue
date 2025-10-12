<template>
  <div class="cm content-controls">
    <div class="controls-top">
      <!-- Search Bar -->
      <div class="search-section">
        <div class="search-input-group">
          <i class="fas fa-search search-icon"></i>
          <input
            type="text"
            class="form-control search-input"
            placeholder="Tìm kiếm theo tiêu đề, nội dung, tác giả, từ khóa..."
            :value="searchQuery"
            @input="$emit('update:searchQuery', $event.target.value)"
          />
          <button 
            v-if="searchQuery"
            class="btn btn-outline-secondary btn-sm clear-btn"
            @click="$emit('update:searchQuery', '')"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button 
          v-if="selectedContents.length > 0"
          class="btn btn-success btn-sm me-2"
          @click="$emit('bulk-approve')"
        >
          <i class="fas fa-check me-1"></i>
          Duyệt ({{ selectedContents.length }})
        </button>
        <button 
          v-if="selectedContents.length > 0"
          class="btn btn-warning btn-sm me-2"
          @click="$emit('bulk-reject')"
        >
          <i class="fas fa-times me-1"></i>
          Từ chối ({{ selectedContents.length }})
        </button>
        <button 
          v-if="selectedContents.length > 0"
          class="btn btn-danger btn-sm me-2"
          @click="$emit('delete-selected')"
        >
          <i class="fas fa-trash me-1"></i>
          Xóa ({{ selectedContents.length }})
        </button>
        <button 
          class="btn btn-primary btn-sm"
          @click="$emit('add-content')"
        >
          <i class="fas fa-plus me-1"></i>
          Thêm mới
        </button>
      </div>
    </div>

    <!-- Filter Section -->
    <div class="filter-section">
      <div class="filter-row">
        <!-- Type Filter -->
        <div class="filter-group">
          <label class="filter-label">Loại nội dung</label>
          <select 
            class="form-select filter-select"
            :value="selectedType"
            @change="$emit('update:selectedType', $event.target.value)"
          >
            <option value="">Tất cả loại</option>
            <option value="news">📰 Tin tức</option>
            <option value="article">📝 Bài viết</option>
            <option value="campaign">🩸 Chiến dịch</option>
            <option value="notification">📢 Thông báo</option>
            <option value="event">🎉 Sự kiện</option>
          </select>
        </div>

        <!-- Status Filter -->
        <div class="filter-group">
          <label class="filter-label">Trạng thái</label>
          <select 
            class="form-select filter-select"
            :value="selectedStatus"
            @change="$emit('update:selectedStatus', $event.target.value)"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="approved">✅ Đã duyệt</option>
            <option value="pending">⏳ Chờ duyệt</option>
            <option value="rejected">❌ Từ chối</option>
            <option value="draft">📝 Nháp</option>
          </select>
        </div>

        <!-- Category Filter -->
        <div class="filter-group">
          <label class="filter-label">Danh mục</label>
          <select 
            class="form-select filter-select"
            :value="selectedCategory"
            @change="$emit('update:selectedCategory', $event.target.value)"
          >
            <option value="">Tất cả danh mục</option>
            <option value="Chiến dịch">Chiến dịch</option>
            <option value="Sức khỏe">Sức khỏe</option>
            <option value="Thông báo">Thông báo</option>
            <option value="Sự kiện">Sự kiện</option>
            <option value="Tin tức">Tin tức</option>
          </select>
        </div>

        <!-- Date Filter -->
        <div class="filter-group">
          <label class="filter-label">Ngày tạo</label>
          <input
            type="date"
            class="form-control filter-date"
            :value="selectedDate"
            @change="$emit('update:selectedDate', $event.target.value)"
          />
        </div>

        <!-- Clear Filters -->
        <div class="filter-group">
          <label class="filter-label">&nbsp;</label>
          <button 
            class="btn btn-outline-secondary btn-sm clear-filters-btn"
            @click="clearAllFilters"
          >
            <i class="fas fa-times me-1"></i>
            Xóa bộ lọc
          </button>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="quick-stats">
      <div class="quick-stat">
        <span class="quick-stat-label">Hiển thị:</span>
        <span class="quick-stat-value">{{ filteredCount }} / {{ totalCount }}</span>
      </div>
      <div class="quick-stat" v-if="selectedContents.length > 0">
        <span class="quick-stat-label">Đã chọn:</span>
        <span class="quick-stat-value text-primary">{{ selectedContents.length }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  },
  selectedType: {
    type: String,
    default: ''
  },
  selectedStatus: {
    type: String,
    default: ''
  },
  selectedCategory: {
    type: String,
    default: ''
  },
  selectedDate: {
    type: String,
    default: ''
  },
  selectedContents: {
    type: Array,
    default: () => []
  },
  filteredCount: {
    type: Number,
    default: 0
  },
  totalCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits([
  'update:searchQuery',
  'update:selectedType',
  'update:selectedStatus',
  'update:selectedCategory',
  'update:selectedDate',
  'add-content',
  'delete-selected',
  'bulk-approve',
  'bulk-reject'
])

const clearAllFilters = () => {
  emit('update:searchQuery', '')
  emit('update:selectedType', '')
  emit('update:selectedStatus', '')
  emit('update:selectedCategory', '')
  emit('update:selectedDate', '')
}
</script>

<style scoped>
.content-controls {
  padding: 1.5rem;
  background: white;
  border-bottom: 1px solid #e9ecef;
}

.controls-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.search-section {
  flex: 1;
  max-width: 500px;
}

.search-input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #6c757d;
  z-index: 2;
}

.search-input {
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  font-size: 0.9rem;
}

.search-input:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.clear-btn {
  position: absolute;
  right: 8px;
  border: none;
  background: none;
  color: #6c757d;
  padding: 4px 8px;
  border-radius: 4px;
}

.clear-btn:hover {
  background: #f8f9fa;
  color: #495057;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-section {
  margin-bottom: 1rem;
}

.filter-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.5rem;
}

.filter-select,
.filter-date {
  border-radius: 6px;
  border: 1px solid #dee2e6;
  font-size: 0.9rem;
  padding: 0.5rem 0.75rem;
}

.filter-select:focus,
.filter-date:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.clear-filters-btn {
  height: fit-content;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
}

.quick-stats {
  display: flex;
  gap: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #f1f3f4;
}

.quick-stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quick-stat-label {
  font-size: 0.85rem;
  color: #6c757d;
  font-weight: 500;
}

.quick-stat-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: #495057;
}

@media (max-width: 768px) {
  .controls-top {
    flex-direction: column;
    gap: 1rem;
  }
  
  .search-section {
    max-width: none;
  }
  
  .action-buttons {
    width: 100%;
    justify-content: flex-start;
  }
  
  .filter-row {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .quick-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 576px) {
  .content-controls {
    padding: 1rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .action-buttons .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
