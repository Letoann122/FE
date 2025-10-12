<template>
  <div v-if="show" class="cm modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">
          <i class="fas fa-chart-bar text-primary me-2"></i>
          Thống kê nội dung
        </h3>
        <button class="btn-close" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="modal-body">
        <!-- Overview Statistics -->
        <div class="stats-section">
          <h5 class="section-title">
            <i class="fas fa-tachometer-alt text-success me-2"></i>
            Tổng quan
          </h5>
          
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon bg-primary">
                <i class="fas fa-file-alt"></i>
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ statistics.total }}</div>
                <div class="stat-label">Tổng nội dung</div>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon bg-success">
                <i class="fas fa-check-circle"></i>
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ statistics.published }}</div>
                <div class="stat-label">Đã duyệt</div>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon bg-warning">
                <i class="fas fa-clock"></i>
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ statistics.pending }}</div>
                <div class="stat-label">Chờ duyệt</div>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon bg-danger">
                <i class="fas fa-times-circle"></i>
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ statistics.rejected }}</div>
                <div class="stat-label">Từ chối</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Engagement Statistics -->
        <div class="stats-section">
          <h5 class="section-title">
            <i class="fas fa-heart text-danger me-2"></i>
            Tương tác
          </h5>
          
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon bg-info">
                <i class="fas fa-eye"></i>
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ formatNumber(statistics.totalViews) }}</div>
                <div class="stat-label">Tổng lượt xem</div>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon bg-danger">
                <i class="fas fa-heart"></i>
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ formatNumber(statistics.totalLikes) }}</div>
                <div class="stat-label">Tổng lượt thích</div>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon bg-secondary">
                <i class="fas fa-comments"></i>
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ formatNumber(statistics.totalComments) }}</div>
                <div class="stat-label">Tổng bình luận</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Content by Type -->
        <div class="stats-section">
          <h5 class="section-title">
            <i class="fas fa-chart-pie text-warning me-2"></i>
            Phân bố theo loại
          </h5>
          
          <div class="chart-container">
            <div class="chart-grid">
              <div 
                v-for="(count, type) in statistics.byType" 
                :key="type"
                class="chart-item"
              >
                <div class="chart-bar">
                  <div 
                    class="chart-fill"
                    :class="getTypeColor(type)"
                    :style="{ height: getPercentage(count, getTotalByType()) + '%' }"
                  ></div>
                </div>
                <div class="chart-info">
                  <div class="chart-label">{{ getTypeLabel(type) }}</div>
                  <div class="chart-value">{{ count }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Content by Category -->
        <div class="stats-section">
          <h5 class="section-title">
            <i class="fas fa-folder text-info me-2"></i>
            Phân bố theo danh mục
          </h5>
          
          <div class="category-list">
            <div 
              v-for="(count, category) in statistics.byCategory" 
              :key="category"
              class="category-item"
            >
              <div class="category-info">
                <div class="category-name">{{ category }}</div>
                <div class="category-count">{{ count }} nội dung</div>
              </div>
              <div class="category-bar">
                <div 
                  class="category-fill"
                  :style="{ width: getPercentage(count, getTotalByCategory()) + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="stats-section">
          <h5 class="section-title">
            <i class="fas fa-history text-secondary me-2"></i>
            Hoạt động gần đây
          </h5>
          
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-icon bg-success">
                <i class="fas fa-check"></i>
              </div>
              <div class="activity-info">
                <div class="activity-title">Duyệt nội dung mới</div>
                <div class="activity-time">2 giờ trước</div>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon bg-primary">
                <i class="fas fa-plus"></i>
              </div>
              <div class="activity-info">
                <div class="activity-title">Thêm nội dung mới</div>
                <div class="activity-time">5 giờ trước</div>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon bg-warning">
                <i class="fas fa-edit"></i>
              </div>
              <div class="activity-info">
                <div class="activity-title">Chỉnh sửa nội dung</div>
                <div class="activity-time">1 ngày trước</div>
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
        <button type="button" class="btn btn-primary">
          <i class="fas fa-download me-2"></i>
          Xuất báo cáo
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
  statistics: {
    type: Object,
    default: () => ({
      total: 0,
      published: 0,
      pending: 0,
      rejected: 0,
      totalViews: 0,
      totalLikes: 0,
      totalComments: 0,
      byType: {},
      byCategory: {}
    })
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const getTotalByType = () => {
  return Object.values(props.statistics.byType).reduce((sum, count) => sum + count, 0)
}

const getTotalByCategory = () => {
  return Object.values(props.statistics.byCategory).reduce((sum, count) => sum + count, 0)
}

const getPercentage = (value, total) => {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
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

const getTypeColor = (type) => {
  const colors = {
    'news': 'bg-primary',
    'article': 'bg-success',
    'campaign': 'bg-danger',
    'notification': 'bg-warning',
    'event': 'bg-info'
  }
  return colors[type] || 'bg-secondary'
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

.stats-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
  display: flex;
  align-items: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.85rem;
  color: #6c757d;
  font-weight: 500;
}

.chart-container {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  align-items: end;
  height: 200px;
}

.chart-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.chart-bar {
  width: 40px;
  height: 150px;
  background: #e9ecef;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.chart-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 4px;
  transition: height 0.3s ease;
}

.chart-info {
  text-align: center;
}

.chart-label {
  font-size: 0.8rem;
  color: #6c757d;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.chart-value {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.category-info {
  min-width: 150px;
}

.category-name {
  font-weight: 600;
  color: #495057;
  margin-bottom: 0.25rem;
}

.category-count {
  font-size: 0.85rem;
  color: #6c757d;
}

.category-bar {
  flex: 1;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.category-fill {
  height: 100%;
  background: linear-gradient(90deg, #dc3545, #fd7e14);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
}

.activity-info {
  flex: 1;
}

.activity-title {
  font-weight: 600;
  color: #495057;
  margin-bottom: 0.25rem;
}

.activity-time {
  font-size: 0.85rem;
  color: #6c757d;
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
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-grid {
    grid-template-columns: repeat(2, 1fr);
    height: 150px;
  }
  
  .chart-bar {
    height: 100px;
  }
  
  .category-item {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
  
  .category-info {
    min-width: auto;
  }
}
</style>
