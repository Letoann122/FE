<template>
  <div class="cm content-pagination">
    <div class="pagination-info">
      <div class="pagination-stats">
        <span class="stats-text">
          Hiển thị {{ startItem }} - {{ endItem }} trong tổng số {{ totalContents }} nội dung
        </span>
      </div>
      
      <div class="pagination-controls">
        <div class="rows-per-page">
          <label class="rows-label">Số dòng:</label>
          <select 
            class="form-select rows-select"
            :value="rowsPerPage"
            @change="$emit('update:rowsPerPage', parseInt($event.target.value))"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <nav class="pagination-nav">
          <ul class="pagination">
            <!-- First Page -->
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button 
                class="page-link"
                @click="goToPage(1)"
                :disabled="currentPage === 1"
              >
                <i class="fas fa-angle-double-left"></i>
              </button>
            </li>

            <!-- Previous Page -->
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button 
                class="page-link"
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
              >
                <i class="fas fa-angle-left"></i>
              </button>
            </li>

            <!-- Page Numbers -->
            <li 
              v-for="page in visiblePages" 
              :key="page"
              class="page-item"
              :class="{ active: page === currentPage }"
            >
              <button 
                class="page-link"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>
            </li>

            <!-- Next Page -->
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button 
                class="page-link"
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
              >
                <i class="fas fa-angle-right"></i>
              </button>
            </li>

            <!-- Last Page -->
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button 
                class="page-link"
                @click="goToPage(totalPages)"
                :disabled="currentPage === totalPages"
              >
                <i class="fas fa-angle-double-right"></i>
              </button>
            </li>
          </ul>
        </nav>

      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    default: 1
  },
  totalContents: {
    type: Number,
    default: 0
  },
  rowsPerPage: {
    type: Number,
    default: 10
  },
  visiblePages: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['go-to-page', 'update:rowsPerPage'])

const startItem = computed(() => {
  return (props.currentPage - 1) * props.rowsPerPage + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.rowsPerPage, props.totalContents)
})


const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('go-to-page', page)
  }
}
</script>

<style scoped>
.content-pagination {
  padding: 1.5rem;
  background: white;
  border-top: 1px solid #e9ecef;
}

.pagination-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.pagination-stats {
  flex: 1;
}

.stats-text {
  font-size: 0.9rem;
  color: #6c757d;
  font-weight: 500;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.rows-per-page {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rows-label {
  font-size: 0.9rem;
  color: #495057;
  font-weight: 500;
  white-space: nowrap;
}

.rows-select {
  width: 70px;
  font-size: 0.9rem;
  padding: 0.375rem 0.5rem;
  border-radius: 6px;
}

.pagination-nav {
  margin: 0;
}

.pagination {
  margin: 0;
  display: flex;
  gap: 0.25rem;
}

.page-item {
  list-style: none;
}

.page-link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.75rem;
  border: 1px solid #dee2e6;
  background: white;
  color: #495057;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  min-width: 40px;
  transition: all 0.2s ease;
}

.page-link:hover:not(.disabled) {
  background: #f8f9fa;
  border-color: #adb5bd;
  color: #495057;
}

.page-item.active .page-link {
  background: #dc3545;
  border-color: #dc3545;
  color: white;
}

.page-item.disabled .page-link {
  background: #f8f9fa;
  border-color: #dee2e6;
  color: #6c757d;
  cursor: not-allowed;
}

.page-jump {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}


/* Responsive */
@media (max-width: 768px) {
  .pagination-info {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .pagination-controls {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
  }
  
  .rows-per-page {
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }
  
  .pagination {
    justify-content: center;
  }
  
}

@media (max-width: 576px) {
  .content-pagination {
    padding: 1rem;
  }
  
  .pagination-controls {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .page-link {
    padding: 0.375rem 0.5rem;
    font-size: 0.8rem;
    min-width: 32px;
  }
}
</style>
