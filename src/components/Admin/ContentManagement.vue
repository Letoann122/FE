<template>
  <div class="cm min-vh-100 bg-light p-4">
    <div class="bg-white rounded shadow-sm">
      <!-- Header -->
      <ContentHeader 
        :statistics="statistics"
        @add-content="showAddContentModal = true"
        @show-statistics="showStatisticsPanel = true"
      />

      <!-- Controls -->
      <ContentControls 
        v-model:search-query="searchQuery"
        v-model:selected-type="selectedType"
        v-model:selected-status="selectedStatus"
        v-model:selected-category="selectedCategory"
        v-model:selected-date="selectedDate"
        :selected-contents="selectedContents"
        @add-content="showAddContentModal = true"
        @delete-selected="deleteSelectedContents"
        @bulk-approve="bulkApproveContents"
        @bulk-reject="bulkRejectContents"
      />
  
      <!-- Table -->
      <ContentTable 
        :filtered-contents="filteredContents"
        v-model:select-all="selectAll"
        v-model:selected-contents="selectedContents"
        @toggle-select-all="toggleSelectAll"
        @edit-content="editContent"
        @delete-content="deleteContent"
        @approve-content="approveContent"
        @reject-content="rejectContent"
        @preview-content="previewContent"
      />

      <!-- Pagination -->
      <ContentPagination 
        :current-page="currentPage"
        :total-pages="totalPages"
        :total-contents="totalContents"
        v-model:rows-per-page="rowsPerPage"
        :visible-pages="visiblePages"
        @go-to-page="goToPage"
      />
    </div>

    <!-- Add Content Modal -->
    <AddContentModal 
      :show="showAddContentModal"
      :content-data="newContent"
      :available-tags="availableTags"
      @close="showAddContentModal = false"
      @add-content="addContent"
    />

    <!-- Edit Content Modal -->
    <EditContentModal 
      :show="showEditContentModal"
      :content-data="editContentData"
      :available-tags="availableTags"
      @close="showEditContentModal = false"
      @update-content="updateContent"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteContentModal 
      :show="showDeleteModal"
      :content="deletingContent"
      @cancel="cancelDelete"
      @confirm="confirmDelete"
    />

    <!-- Preview Modal -->
    <PreviewContentModal 
      :show="showPreviewModal"
      :content="previewContentData"
      @close="showPreviewModal = false"
    />

    <!-- Approval Modal -->
    <ApprovalModal 
      :show="showApprovalModal"
      :content="approvalContent"
      :approval-type="approvalType"
      @close="showApprovalModal = false"
      @approve="handleApprove"
      @reject="handleReject"
    />

    <!-- Statistics Panel -->
    <StatisticsPanel 
      :show="showStatisticsPanel"
      :statistics="statistics"
      @close="showStatisticsPanel = false"
    />
  </div>
</template>
  
<script setup>
import { useContentManagement } from './ContentManagement/composables/useContentManagement.js'
import ContentHeader from './ContentManagement/components/header.vue'
import ContentControls from './ContentManagement/components/controls.vue'
import ContentTable from './ContentManagement/components/table.vue'
import ContentPagination from './ContentManagement/components/pagination.vue'
import AddContentModal from './ContentManagement/components/add.vue'
import EditContentModal from './ContentManagement/components/edit.vue'
import DeleteContentModal from './ContentManagement/components/delete.vue'
import PreviewContentModal from './ContentManagement/components/preview.vue'
import ApprovalModal from './ContentManagement/components/approval.vue'
import StatisticsPanel from './ContentManagement/components/statistics.vue'

// Use the composable
const {
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
} = useContentManagement()
</script>

<style>
@import './ContentManagement/styles/content-management.css';
</style>
