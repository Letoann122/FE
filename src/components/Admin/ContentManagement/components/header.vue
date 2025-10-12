<template>
  <div class="cm content-header">
    <div class="header-top">
      <div class="header-left">
        <div class="page-title-section">
          <h1 class="page-title">
            <i class="fas fa-newspaper text-danger me-2"></i>
            Quản lý nội dung
          </h1>
          <p class="page-subtitle">Duyệt và quản lý tin tức, bài viết, chiến dịch hiến máu</p>
        </div>
      </div>
      <div class="header-right">
        <button 
          class="btn btn-outline-danger btn-sm me-2"
          @click="$emit('show-statistics')"
        >
          <i class="fas fa-chart-bar me-1"></i>
          Thống kê
        </button>
        <button 
          class="btn btn-danger btn-sm"
          @click="$emit('add-content')"
        >
          <i class="fas fa-plus me-1"></i>
          Thêm nội dung
        </button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="stats-cards">
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
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  statistics: {
    type: Object,
    default: () => ({
      total: 0,
      published: 0,
      pending: 0,
      rejected: 0,
      totalViews: 0,
      totalLikes: 0,
      totalComments: 0
    })
  }
})

const emit = defineEmits(['add-content', 'show-statistics'])

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}
</script>

<style scoped>
.content-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.header-left {
  flex: 1;
}

.page-title-section {
  display: flex;
  flex-direction: column;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
}

.page-subtitle {
  color: #6c757d;
  margin: 0;
  font-size: 0.95rem;
  align-self: flex-start;
}

.header-right {
  display: flex;
  gap: 0.5rem;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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

@media (max-width: 768px) {
  .header-top {
    flex-direction: column;
    gap: 1rem;
  }
  
  .header-right {
    width: 100%;
    justify-content: flex-end;
  }
  
  .stats-cards {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.75rem;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .stat-icon {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .stat-number {
    font-size: 1.25rem;
  }
}
</style>
